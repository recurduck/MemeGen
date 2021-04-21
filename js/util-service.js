'use strict'

var idArr = [];

function makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
    var txt = '';
    while (size > 0) {
        size--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}

function elFadeOut(elClass) {
    document.querySelector(elClass).classList.remove('visible') 
    document.querySelector(elClass).classList.add('hidden') 
}
function elFadeIn(elClass) {
    document.querySelector(elClass).classList.remove('hidden') 
    document.querySelector(elClass).classList.add('visible') 
}


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function generateId(idArr) {
    if (idArr.length === idArr[idArr.length] || idArr.length === 0) {
        idArr.push(idArr.length + 1)
        return idArr.length
    } else {
        var missingNun = getMissingNo(idArr, idArr.length);
        idArr.splice(missingNun - 1, 0, missingNun);
        return missingNun;
    } 
}

function getMissingNo(arr, length) {
    var total = Math.floor((length + 1) * (length + 2) / 2);
    for (var i = 0; i < length; i++)
        total -= arr[i];
    return total;
}

function getIds(objArr) {
    let arr = [];
    for(var i = 0; i < objArr.length; i++){
        arr.push(objArr[i].id)
    }
    return arr;
}