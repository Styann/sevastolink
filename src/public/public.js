import { Root } from './module/Root.js';
import { Folder } from './module/Folder.js';
import { ArchiveLog } from './module/ArchiveLog.js';

import { getRandomInt, display, animationState, get, loadJSON, htmlToElement } from './module/utils.js';
import { delay, waitForKey, waitAnimationEnded, waitForAudio } from './module/async.js';

const signin = document.getElementById('sign-in');

const mosaic_loading = document.getElementById('mosaic-loading');
const children = mosaic_loading.children;

var test = '<div class="tile-wrapper"><div class="tile"></div></div>'
for(let i = 0; i<170; i++){
    mosaic_loading.innerHTML += test;    
}


const loadingPage = document.getElementById('loading-page');
const progressbar = document.getElementById('progress');

const menu = document.getElementById('menu');


//const fileContent = document.getElementById('archive-log-content');
//const archiveLogList = document.getElementById('archive-log-list');     

Folder.archiveLogsJSON = await loadJSON('./assets/archiveLogs.json');
const personalFolder = new Folder('personal', document.getElementById('personal'), [get(0,'plb'), get(0, 'prb')]);
const sharedFolder = new Folder('shared', document.getElementById('shared'), [get(0,'slb'), get(0, 'srb')]);
const audioFolder = new Folder('audio', document.getElementById('audio'), [get(0,'alb'), get(0, 'arb')]);
const nostromoFolder = new Folder('nostromo', document.getElementById('nostromo'), [get(0,'ulb'), get(0, 'urb')]);

Root.static_constructor([personalFolder, sharedFolder, audioFolder, nostromoFolder], get('file-pointer'));

async function runMosaicTransition(){
    display(mosaic_loading, 'grid');
    for(let i=0; i<170; i++){
        children[i].firstChild.style.animationPlayState = 'running';
    }
    await delay(200);
    display(mosaic_loading, 'none');
}

const startup = new Audio('SFX/Interactive_Terminal_Startup.ogg');
startup.volume = 0.3;

const loop = new Audio('SFX/Interactive_Terminal_BG_Loop.ogg');
loop.volume = 0;
loop.loop = true;



//(async () => {

//1
await waitForKey('e', true);
display(signin, 'none');
loop.play();
//1

await runMosaicTransition();

//2
display(loadingPage, 'grid');

animationState(progressbar, true);
progressbar.addEventListener
startup.play();

async function progress_bar_animation_handler(){
await delay(1000);

loop.volume = 0.045;
display(loadingPage, 'none');
await runMosaicTransition();

display(menu, 'grid');
}

progressbar.addEventListener('animationend', progress_bar_animation_handler, true);
progressbar.removeEventListener('animationend', progress_bar_animation_handler, false);

// grant user to browse
Root.running = true;

/*setTimeout(() => {
console.log("end timer")
}, "5000");*/

async function controls_handler(pressedKey){
if(Root.running){

    if(pressedKey.repeat){

    }
    else if(Root.running){
        switch(pressedKey.code){
            case Root.controls["forward"]:
                if(!Root.currentFolder.isSelected){
                    //move folder above
                    Root.preselectAboveFolder();
                    Root.currentFolder.setupFiles();
                    await delay(2000);
                }else{
                    //move file above
                    Root.currentFolder.selectAboveFile();
                }

                break;

            case Root.controls["backward"]:
                if(!Root.currentFolder.isSelected){
                    //move folder below
                    Root.preselectBelowFolder();
                    Root.currentFolder.setupFiles();
                    //setTimeout(() => {Root.running = true;}, (Folder.preselectAudio.duration * 100));
                }else{
                    //move file below
                    Root.currentFolder.selectBelowFile();
                }
                break;
            
            case Root.controls["use"]:
                if(!Root.currentFolder.isSelected){
                    //select folder and file 1
                    Root.currentFolder.unpreselect();
                    Root.currentFolder.select();
                    Root.currentFolder.currentFile.select();
                }else{
                    //trying to select a file with no success
                    if(Root.currentFolder.currentFile.audio){
                        //a changer
                        if(Root.currentFolder.previousFile){
                            Root.currentFolder.previousFile.stopAudio();
                        }
                        Root.currentFolder.currentFile.audio.play();
                    }else{
                        Root.currentFolder.currentFile.bip();
                    }
                }
                break;
            case Root.controls["return"]:
                if(Root.currentFolder.isSelected){
                    //unselect folder
                    Root.currentFolder.unselect(false);
                    Root.currentFolder.currentFile.unselect();
                }else{
                    //return to sign in / reload page
                    display(menu, 'none');
                    await runMosaicTransition();
                    location.reload();
                    
                }
                break;
            }
        }
    }
}

document.addEventListener('keydown', controls_handler, true);
Root.running = true;
//document.removeEventListener('keydown', controls_handler, false);
