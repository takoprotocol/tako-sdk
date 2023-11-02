import {
    LensClient, production, development, AuthChallengeFragment, CreateMomokaQuoteBroadcastItemResultFragment
} from '@lens-protocol/client';
import { Network } from '../constant';
import * as LensProtocol from '@lens-protocol/client';
import * as MetaData from '@lens-protocol/metadata';
import { MediaAudio, MediaImage, MediaVideo, EncryptableURI } from '@lens-protocol/metadata';
import {
    PublicationMetadata, AnyMedia, MediaImageMimeType, MediaAudioMimeType, MediaVideoMimeType
} from '@lens-protocol/metadata';
import * as ethers from 'ethers';

class LensProtocolV2 {
    private _lensClient: LensClient;

    constructor(network: Network) {
        let environment = development;
        switch (network) {
            case Network.MAINNET:
                environment = production;
            case Network.TESTNET:
            case Network.LOCALHOST:
        }
        this._lensClient = new LensClient({
            environment: environment
        });
    }
    private typeGuard<T extends MediaAudio | MediaImage | MediaVideo>(type: object, toBeDetermined: any): toBeDetermined is T {
        const values = Object.values(type) as string[];
        return values.includes(toBeDetermined.type);
    }
    public generateMedia(link: string, type: MediaImageMimeType | MediaAudioMimeType | MediaVideoMimeType): AnyMedia {
        const item = link as EncryptableURI;
        const media: AnyMedia = {
            item: item,
            type: type as MediaAudioMimeType
        }
        return media;
    }
    public buildPostMetadata(content: string, media: AnyMedia[]): PublicationMetadata {
        let metaData: PublicationMetadata = MetaData.textOnly({ content: content });
        if (media.length != 0) {
            const m = media[0];
            if (this.typeGuard<MediaAudio>(MetaData.MediaAudioMimeType, m)) {
                metaData = MetaData.audio({
                    audio: m,
                    content: content,
                    attachments: media
                });

            } else if (this.typeGuard<MediaImage>(MetaData.MediaImageMimeType, m)) {
                metaData = MetaData.image({
                    image: m,
                    content: content,
                    attachments: media
                });
            } else if (this.typeGuard<MediaVideo>(MetaData.MediaVideoMimeType, m)) {
                metaData = MetaData.video({
                    video: m,
                    content: content,
                    attachments: media
                });
            }

        }
        return MetaData.PublicationMetadataSchema.parse(metaData);
    }
    public async generateChallenge(profileId: string): Promise<AuthChallengeFragment> {
        const profileById = await this._lensClient.profile.fetch({
            forProfileId: profileId,
        });
        let address = profileById?.handle?.ownedBy;
        if (address) {
            const request: LensProtocol.ChallengeRequest = { for: profileId, signedBy: address };
            return await this._lensClient.authentication.generateChallenge(request);
        }
        throw `can't get address by profile id:${profileId}`;
    }
    public async auth(id: string, signature: string): Promise<boolean> {
        const request: LensProtocol.SignedAuthChallenge = { id: id, signature: signature }
        await this._lensClient.authentication.authenticate(request);
        return await this._lensClient.authentication.isAuthenticated();
    }
    public async generateMomokaQuoteTypedData(contentURI: string, quotedPubId: string): Promise<CreateMomokaQuoteBroadcastItemResultFragment> {
        const result = await this._lensClient.publication.createMomokaQuoteTypedData({
            quoteOn: quotedPubId,
            contentURI: contentURI,
        });
        try {
            if (result.isFailure()) {
                throw result;
            }
            const typedDataFragment = (result.value as any) as CreateMomokaQuoteBroadcastItemResultFragment;
            return typedDataFragment;
        } catch (err) {
            throw err;
        }
    }

    public async personalSignWithPrivateKey(privateKey: string, message: string) {
        const wallet = new ethers.Wallet(privateKey);
        const signature = await wallet.signMessage(message);
        return signature;
    }
    public async signTypeData(privateKey: string, typedData): Promise<string> {
        const wallet = new ethers.Wallet(privateKey);
        const signature = await wallet._signTypedData(typedData.domain, typedData.types, typedData.value);
        return signature;
    }
    public async broadcastQuotePost(id: string, signature: string): Promise<LensProtocol.CreateMomokaPublicationResultFragment> {
        const result = await this._lensClient.transaction.broadcastOnMomoka({
            id,
            signature: signature,
        });
        try {
            if (result.isFailure()) {
                throw result;
            }
            const postFragment = (result.value as any) as LensProtocol.CreateMomokaPublicationResultFragment;
            return postFragment;
        } catch (error) {
            throw error;
        }
    }
    public async fetchPublication(contentId: string): Promise<LensProtocol.AnyPublicationFragment | null> {
        const result = await this._lensClient.publication.fetch({
            forId: contentId,
        });
        return result;
    }
}
export { MediaImageMimeType, MediaAudioMimeType, MediaVideoMimeType, PublicationMetadata }
export { AuthChallengeFragment }
export { LensProtocolV2 }