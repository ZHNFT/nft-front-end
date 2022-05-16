import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

export type EndpointTypes = WalletAdapterNetwork.Mainnet | WalletAdapterNetwork.Testnet | WalletAdapterNetwork.Devnet
export type User = {
    displayName?: string;
    email?: string;
    bio?: string;
    dob?: Date;
    gender?: string;
    password?: any;
    displayImageURL: string;
    displayImage?: any;
    coverImageURL?: string;
    coverImage?: any;
    facebookLink?: string;
    twitterLink?: string;
    youtubeLink?: string;
    discordLink?: string;
    role?: string;
    roleTypeId: number;
    accessToken?: string;
    webTermsCondition?: string;
    webPrivacyPolicy?: string;
}

export interface UserId {
    timestamp: number;
    machine: number;
    pid: number;
    increment: number;
    creationTime: Date;
}

// export type User = {
//     displayName: String
//     email: string
//     token: string
//     dob: Date
//     gender: string
//     bio?: string
//     socialmedia: SocialMedia
// }
// export type SocialMedia = {
//     facebook?: string
//     twitter?: string
//     youtube?: string
//     discord?: string
//     instagram?: string
// }