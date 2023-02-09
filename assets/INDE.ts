import { _decorator, Component, Node, native, Label, assetManager, AudioClip, AudioSource, ImageAsset, SpriteFrame, Texture2D, Sprite } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('INDE')
export class INDE extends Component {
    @property({ type: Label })
    startLabel: Label = null;
    @property({ type: Label })
    stopLabel: Label = null;
    @property({ type: Label })
    deleteLabel: Label = null;
    @property({ type: Sprite })
    btnSprite: Sprite = null;
    start() {

    }
    deleteRecording(){
        console.log("clikced");
        this.deleteLabel.string = "Recording Deleted"
        native.reflection.callStaticMethod("com/cocos/game/AppActivity", "deleteRecording", "(Ljava/lang/String;)V", "delete");
    }
    startRecording = () => {
        console.log("clikced");
        this.startLabel.string = "Recording started"
        native.reflection.callStaticMethod("com/cocos/game/AppActivity", "startRecording", "(Ljava/lang/String;)V", "start");
    }
    stopRecording = ()=>{
        console.log("clikced");
        let clip = this.node.getComponent(AudioSource).clip;
        console.log(clip);
        this.stopLabel.string = "Recording stopped"
        //native.reflection.callStaticMethod("com/cocos/game/AppActivity", "stopRecording", "(Ljava/lang/String;)V",  "stop");
        var result = native.reflection.callStaticMethod("com/cocos/game/AppActivity", "stopRecording", "(Ljava/lang/String;)Ljava/lang/String;", "stop");
        console.log("Inside StopRecording", result);
        if (result) {
            console.log("INSIDE IF CONDITION");

            let absolutePath = `${result}/1.jpg`
            assetManager.loadRemote<ImageAsset>(absolutePath, (err, imageAsset) => {
                console.log("PATH", absolutePath);
                if (err) {
                    console.log("ERROR");
                    console.log(JSON.stringify(err));
                    return;
                }
                console.log("NO ERROR");
                const spriteFrame = new SpriteFrame();
                const texture = new Texture2D();
                texture.image = imageAsset;
                spriteFrame.texture = texture;
                console.log("SPRITE", JSON.stringify(spriteFrame));
                this.btnSprite.spriteFrame = spriteFrame;
                //this.node.getComponent(Sprite).spriteFrame = spriteFrame;

            });
            // let absolutePath2 = `${result}/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3`
            // assetManager.loadRemote<AudioClip>(absolutePath2, { audioLoadMode: AudioClip.AudioType.NATIVE_AUDIO }, (err, audioClip) => {
            //     console.log("PATH", absolutePath2);
            //     if (err) {
            //         console.log("ERROR");
            //         console.log(JSON.stringify(err))
            //         return;
            //     }
            //     console.log("CLIP", audioClip);
            //     this.node.getComponent(AudioSource).clip=audioClip;
            //     this.node.getComponent(AudioSource).play()
            // });
            let absolutePath2 = `${result}/audioC.mp3`
            assetManager.loadRemote<AudioClip>(absolutePath2, { audioLoadMode: AudioClip.AudioType.NATIVE_AUDIO }, (err, audioClip) => {
                console.log("PATH", absolutePath2);
                if (err) {
                    console.log("ERROR");
                    console.log(JSON.stringify(err))
                    return;
                }
                console.log("CLIP", audioClip);
                this.node.getComponent(AudioSource).clip=audioClip;
                this.node.getComponent(AudioSource).play()
            });
        }
    }

    // this.node.getComponent(AudioSource).active = true;

    // let clip = this.node.getComponent(AudioSource).clip;
    // clip = audioClip;
}




