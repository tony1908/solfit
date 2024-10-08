export type ChallengeProgram = {
    "version": "0.1.0",
    "name": "challenge_program",
    "instructions": [
        {
            "name": "createChallenge",
            "accounts": [
                {
                    "name": "challenge",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "creator",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "challengeId",
                    "type": "u64"
                },
                {
                    "name": "entryAmount",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "joinChallenge",
            "accounts": [
                {
                    "name": "challenge",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "participant",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "challengeId",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "finishChallenge",
            "accounts": [
                {
                    "name": "challenge",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "creator",
                    "isMut": false,
                    "isSigner": true
                }
            ],
            "args": [
                {
                    "name": "challengeId",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "claimShare",
            "accounts": [
                {
                    "name": "challenge",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "participant",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "challengeId",
                    "type": "u64"
                }
            ]
        }
    ],
    "accounts": [
        {
            "name": "challenge",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "challengeId",
                        "type": "u64"
                    },
                    {
                        "name": "creator",
                        "type": "publicKey"
                    },
                    {
                        "name": "entryAmount",
                        "type": "u64"
                    },
                    {
                        "name": "totalAmount",
                        "type": "u64"
                    },
                    {
                        "name": "isFinished",
                        "type": "bool"
                    },
                    {
                        "name": "participants",
                        "type": {
                            "vec": {
                                "defined": "ParticipantInfo"
                            }
                        }
                    }
                ]
            }
        }
    ],
    "types": [
        {
            "name": "ParticipantInfo",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "pubkey",
                        "type": "publicKey"
                    },
                    {
                        "name": "claimed",
                        "type": "bool"
                    }
                ]
            }
        }
    ],
    "errors": [
        {
            "code": 6000,
            "name": "ChallengeFinished",
            "msg": "The challenge has already finished."
        },
        {
            "code": 6001,
            "name": "AlreadyJoined",
            "msg": "Participant has already joined the challenge."
        },
        {
            "code": 6002,
            "name": "Overflow",
            "msg": "Overflow occurred."
        },
        {
            "code": 6003,
            "name": "ChallengeNotFinished",
            "msg": "Challenge is not yet finished."
        },
        {
            "code": 6004,
            "name": "NotParticipant",
            "msg": "Participant did not join the challenge."
        },
        {
            "code": 6005,
            "name": "DivisionByZero",
            "msg": "Division by zero occurred."
        },
        {
            "code": 6006,
            "name": "AlreadyClaimed",
            "msg": "Participant has already claimed their share."
        }
    ]
};

export const IDL: ChallengeProgram = {
    "version": "0.1.0",
    "name": "challenge_program",
    "instructions": [
        {
            "name": "createChallenge",
            "accounts": [
                {
                    "name": "challenge",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "creator",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "challengeId",
                    "type": "u64"
                },
                {
                    "name": "entryAmount",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "joinChallenge",
            "accounts": [
                {
                    "name": "challenge",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "participant",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "challengeId",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "finishChallenge",
            "accounts": [
                {
                    "name": "challenge",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "creator",
                    "isMut": false,
                    "isSigner": true
                }
            ],
            "args": [
                {
                    "name": "challengeId",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "claimShare",
            "accounts": [
                {
                    "name": "challenge",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "participant",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "challengeId",
                    "type": "u64"
                }
            ]
        }
    ],
    "accounts": [
        {
            "name": "challenge",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "challengeId",
                        "type": "u64"
                    },
                    {
                        "name": "creator",
                        "type": "publicKey"
                    },
                    {
                        "name": "entryAmount",
                        "type": "u64"
                    },
                    {
                        "name": "totalAmount",
                        "type": "u64"
                    },
                    {
                        "name": "isFinished",
                        "type": "bool"
                    },
                    {
                        "name": "participants",
                        "type": {
                            "vec": {
                                "defined": "ParticipantInfo"
                            }
                        }
                    }
                ]
            }
        }
    ],
    "types": [
        {
            "name": "ParticipantInfo",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "pubkey",
                        "type": "publicKey"
                    },
                    {
                        "name": "claimed",
                        "type": "bool"
                    }
                ]
            }
        }
    ],
    "errors": [
        {
            "code": 6000,
            "name": "ChallengeFinished",
            "msg": "The challenge has already finished."
        },
        {
            "code": 6001,
            "name": "AlreadyJoined",
            "msg": "Participant has already joined the challenge."
        },
        {
            "code": 6002,
            "name": "Overflow",
            "msg": "Overflow occurred."
        },
        {
            "code": 6003,
            "name": "ChallengeNotFinished",
            "msg": "Challenge is not yet finished."
        },
        {
            "code": 6004,
            "name": "NotParticipant",
            "msg": "Participant did not join the challenge."
        },
        {
            "code": 6005,
            "name": "DivisionByZero",
            "msg": "Division by zero occurred."
        },
        {
            "code": 6006,
            "name": "AlreadyClaimed",
            "msg": "Participant has already claimed their share."
        }
    ]
};
