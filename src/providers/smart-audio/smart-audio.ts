import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { Storage } from '@ionic/storage';

@Injectable()
export class SmartAudio {
 
    audioType: string = 'html5';
    sounds: any = [];
    playSound = true;
 
    constructor(public nativeAudio: NativeAudio, platform: Platform, private storage: Storage) {
        if (platform.is('cordova')){
            this.audioType = 'native';
        }

        this.storage.get('sound').then((val) => {
            this.playSound = val;
        });
    }

    preload(key, asset) {
        if (this.audioType === 'html5'){
            let audio = {
                key: key,
                asset: asset,
                type: 'html5'
            };
 
            this.sounds.push(audio);
        } else {
            this.nativeAudio.preloadSimple(key, asset);
            let audio = {
                key: key,
                asset: key,
                type: 'native'
            };
 
            this.sounds.push(audio);
        }      
    }
 
    play(key){
        if (this.playSound){
            let audio = this.sounds.find((sound) => {
                return sound.key === key;
            });
            if (audio.type === 'html5'){
                let audioAsset = new Audio(audio.asset);
                audioAsset.play();
            } else {
                this.nativeAudio.play(audio.key).then((res) => {
                    console.log(res);
                }, (err) => {
                    console.log(err);
                });
            }
        }
    }
}