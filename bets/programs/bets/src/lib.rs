use anchor_lang::prelude::*;

declare_id!("HU8nRQSGJTa5APqQxCXMUyVDtt47y6PBRhFCrYYaefy4"); // Replace with your actual program ID

#[program]
pub mod challenge_program {
    use super::*;

    pub fn create_challenge(ctx: Context<CreateChallenge>, challenge_id: u64, entry_amount: u64) -> Result<()> {
        let challenge = &mut ctx.accounts.challenge;
        challenge.challenge_id = challenge_id;
        challenge.creator = *ctx.accounts.creator.key;
        challenge.entry_amount = entry_amount;
        challenge.total_amount = 0;
        challenge.is_finished = false;
        challenge.participants = Vec::new();
        Ok(())
    }

    pub fn join_challenge(ctx: Context<JoinChallenge>, challenge_id: u64) -> Result<()> {
        let challenge = &mut ctx.accounts.challenge;
        let participant = &ctx.accounts.participant;

        // Check if challenge is open
        require!(!challenge.is_finished, CustomError::ChallengeFinished);

        // Check if participant has already joined
        if challenge.participants.iter().any(|p| p.pubkey == participant.key()) {
            return Err(CustomError::AlreadyJoined.into());
        }

        // Transfer entry amount from participant to challenge account
        let cpi_context = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            anchor_lang::system_program::Transfer {
                from: participant.to_account_info(),
                to: challenge.to_account_info(),
            },
        );
        anchor_lang::system_program::transfer(cpi_context, challenge.entry_amount)?;

        // Update challenge state
        challenge.participants.push(ParticipantInfo {
            pubkey: participant.key(),
            claimed: false,
        });
        challenge.total_amount = challenge
            .total_amount
            .checked_add(challenge.entry_amount)
            .ok_or(CustomError::Overflow)?;

        Ok(())
    }

    pub fn finish_challenge(ctx: Context<FinishChallenge>, challenge_id: u64) -> Result<()> {
        let challenge = &mut ctx.accounts.challenge;
        challenge.is_finished = true;
        Ok(())
    }

    pub fn claim_share(ctx: Context<ClaimShare>, challenge_id: u64) -> Result<()> {
        let challenge = &mut ctx.accounts.challenge;
        let participant = &ctx.accounts.participant;

        // Check if challenge is finished
        require!(challenge.is_finished, CustomError::ChallengeNotFinished);

        // Find participant index in challenge
        let participant_index = challenge
            .participants
            .iter()
            .position(|p| p.pubkey == participant.key());

        if let Some(index) = participant_index {
            {
                // Limit the mutable borrow scope
                let p_info = &mut challenge.participants[index];
                // Check if already claimed
                if p_info.claimed {
                    return Err(CustomError::AlreadyClaimed.into());
                }
                // Mark as claimed
                p_info.claimed = true;
            }

            // Calculate share
            let num_participants = challenge.participants.len() as u64;
            let share = challenge
                .total_amount
                .checked_div(num_participants)
                .ok_or(CustomError::DivisionByZero)?;

            // Transfer share from challenge account to participant
            **challenge.to_account_info().try_borrow_mut_lamports()? -= share;
            **participant.to_account_info().try_borrow_mut_lamports()? += share;

            Ok(())
        } else {
            Err(CustomError::NotParticipant.into())
        }
    }
}

#[derive(Accounts)]
#[instruction(challenge_id: u64)]
pub struct CreateChallenge<'info> {
    #[account(
        init,
        payer = creator,
        space = 8 + Challenge::LEN,
        seeds = [b"challenge".as_ref(), challenge_id.to_le_bytes().as_ref()],
        bump
    )]
    pub challenge: Account<'info, Challenge>,
    #[account(mut)]
    pub creator: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(challenge_id: u64)]
pub struct JoinChallenge<'info> {
    #[account(
        mut,
        seeds = [b"challenge".as_ref(), challenge_id.to_le_bytes().as_ref()],
        bump
    )]
    pub challenge: Account<'info, Challenge>,
    #[account(mut)]
    pub participant: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(challenge_id: u64)]
pub struct FinishChallenge<'info> {
    #[account(
        mut,
        has_one = creator,
        seeds = [b"challenge".as_ref(), challenge_id.to_le_bytes().as_ref()],
        bump
    )]
    pub challenge: Account<'info, Challenge>,
    pub creator: Signer<'info>,
}

#[derive(Accounts)]
#[instruction(challenge_id: u64)]
pub struct ClaimShare<'info> {
    #[account(
        mut,
        seeds = [b"challenge".as_ref(), challenge_id.to_le_bytes().as_ref()],
        bump
    )]
    pub challenge: Account<'info, Challenge>,
    #[account(mut)]
    pub participant: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Challenge {
    pub challenge_id: u64,
    pub creator: Pubkey,
    pub entry_amount: u64,
    pub total_amount: u64,
    pub is_finished: bool,
    pub participants: Vec<ParticipantInfo>, // Max size of MAX_PARTICIPANTS
}

impl Challenge {
    pub const MAX_PARTICIPANTS: usize = 100;
    pub const LEN: usize =
        8 + 32 + 8 + 8 + 1 + 4 + (ParticipantInfo::LEN * Self::MAX_PARTICIPANTS);
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Default)]
pub struct ParticipantInfo {
    pub pubkey: Pubkey,
    pub claimed: bool,
}

impl ParticipantInfo {
    pub const LEN: usize = 32 + 1;
}

#[error_code]
pub enum CustomError {
    #[msg("The challenge has already finished.")]
    ChallengeFinished,
    #[msg("Participant has already joined the challenge.")]
    AlreadyJoined,
    #[msg("Overflow occurred.")]
    Overflow,
    #[msg("Challenge is not yet finished.")]
    ChallengeNotFinished,
    #[msg("Participant did not join the challenge.")]
    NotParticipant,
    #[msg("Division by zero occurred.")]
    DivisionByZero,
    #[msg("Participant has already claimed their share.")]
    AlreadyClaimed,
}