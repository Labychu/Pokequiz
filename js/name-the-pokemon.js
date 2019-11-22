const maxRound = 100;
let currentRound = 0;
let userPoint = 0;

const pokedex = ['Missingno', 'Bulbasaur', 'Ivysaur', 'Venusaur',
                    'Charmander', 'Charmeleon', 'Charizard', 'Squirtle',
                    'Wartortle', 'Blastoise', 'Caterpie', 'Metapod', 
                    'Butterfree', 'Weedle', 'Kakuna', 'Beedrill', 
                    'Pidgey', 'Pidgeotto', 'Pidgeot', 'Rattata', 
                    'Raticate', 'Spearow', 'Fearow', 'Ekans',
                    'Arbok', 'Pikachu', 'Raichu', 'Sandshrew',
                    'Sandslash', 'Nidoran ♀', 'Nidorina', 'Nidoqueen',
                    'Nidoran ♂', 'Nidorino', 'Nidoking', 'Clefairy',
                    'Clefable', 'Vulpix', 'Ninetales', 'Jigglypuff',
                    'Wigglytuff', 'Zubat', 'Golbat', 'Oddish',
                    'Gloom', 'Vileplume', 'Paras', 'Parasect',
                    'Venonat', 'Venomoth', 'Diglett', 'Dugtrio',
                    'Meowth', 'Persian', 'Psyduck', 'Golduck',
                    'Mankey', 'Primeape', 'Growlithe', 'Arcanine',
                    'Poliwag', 'Poliwhirl', 'Poliwrath', 'Abra',
                    'Kadabra', 'Alakazam', 'Machop', 'Machoke',
                    'Machamp', 'Bellsprout', 'Weepinbell', 'Victreebel',
                    'Tentacool', 'Tentacruel', 'Geodude', 'Graveler',
                    'Golem', 'Ponyta', 'Rapidash', 'Slowpoke', 
                    'Slowbro', 'Magnemite', 'Magneton', "Farfetch'd", 
                    'Doduo', 'Dodrio', 'Seel', 'Dewong',
                    'Grimer', 'Muk', 'Shellder', 'Cloyster',
                    'Gastly', 'Haunter', 'Gengar', 'Onix',
                    'Drowsee', 'Hypno', 'Krabby', 'Kingler',
                    'Voltorb', 'Electrode', 'Exeggcute', 'Exeggutor',
                    'Cubone', 'Marowak', 'Hitmonlee', 'Hitmonchan',
                    'Lickitung', 'Koffing', 'Weezing', 'Rhyhorn',
                    'Rhydon', 'Chansey', 'Tangela', 'Kangaskhan',
                    'Horsea', 'Seadra', 'Goldeen', 'Seaking',
                    'Staryu', 'Starmie', 'Mr. Mime', 'Scyther',
                    'Jynx', 'Electabuzz', 'Magmar', 'Pinsir',
                    'Tauros', 'Magikarp', 'Gyarados', 'Lapras',
                    'Ditto', 'Eevee', 'Vaporeon', 'Jolteon',
                    'Flareon', 'Porygon', 'Omanyte', 'Omastar',
                    'Kabuto', 'Kabutops', 'Aerodactyl', 'Snorlax',
                    'Articuno', 'Zapdos', 'Moltres', 'Dratini',
                    'Dragonair', 'Dragonite', 'Mewtwo', 'Mew'];

class Pokemon {
    constructor(index) {
        this._dexNum = index;
        this._name = pokedex[index];
        this._dexNumInThreeChar = index > 99 ? index :
                                  index > 10 ? '0' + index :
                                  '00' + index;
        this._imgURL = '../image/Pokemon\ image/' + this._dexNumInThreeChar + '.png';
    }
    get dexNum() {
        return this._dexNum;
    }
    get name() {
        return this._name;
    }
    get imgURL() {
        return this._imgURL;
    }
}

let pokemonList = [];  // List of all pokemon, including name and dex number
let dexNumList = [];   // Shuffle this array then pick first 4 numbers as 4 options


$( () => {
    for (i = 1; i < pokedex.length; i++) {
        pokemonList[i] = new Pokemon(i);
        dexNumList[i] = i;          // Initiate pokemon lists
    }
    roundAnnouce();     // Game start here
})

const gameInitiate = () => {
    $('.pre-game').remove();
    $('.content').toggleClass('start');    
}

const roundAnnouce = () => {
    clearTimeout(roundAnnouce);
    currentRound ++;
    if (currentRound > maxRound) {
        endGame();
        return;
    }
    $('.question, .option-list').hide();
    $('.round-announcer').show().find('span').html(currentRound);

    setTimeout( () => {
        $('.question, .option-list').show();
        $('.round-announcer').hide();
        questionStart();
    }, 2000);
}

const questionStart = () => {
    inputDisabled(false);

    let answer, option1, option2, option3, option4;
    let answerDexNum, picNum, img_url;     

    const randomFrom1To4 = Math.ceil(Math.random() * 4);
    dexNumList = arrayShuffle(dexNumList);

    answerDexNum = dexNumList[randomFrom1To4];    // Dex number of the right answer pokemon
    picNum = answerDexNum > 99 ? answerDexNum :
             answerDexNum > 9 ? '0' + answerDexNum :
             '00' + answerDexNum;

    answer = pokemonList[dexNumList[randomFrom1To4]].name;    //pic 4 options and the answer 
    option1 = pokemonList[dexNumList[1]].name;
    option2 = pokemonList[dexNumList[2]].name;
    option3 = pokemonList[dexNumList[3]].name;
    option4 = pokemonList[dexNumList[4]].name;
    img_url = '../image/Pokemon\ image/' + picNum + '.png';

    $('.question').css('background-image', `url('${img_url}')`);
    $('.option.one').val(option1);
    $('.option.two').val(option2);
    $('.option.three').val(option3);
    $('.option.four').val(option4);

    waitForRespnse(answer);
}

const waitForRespnse = (answer) => {
    let answerReveal = setTimeout(showResult, 3000, answer);

    $('.option').click( function() {
        inputDisabled(true);
        setTimeout(clearResult, 3000);
        clearTimeout(answerReveal);
        if ($(this).val() == answer) {   
            $(this).addClass('true-answer');
            setTimeout(roundAnnouce, 2000);
        }
        else {
            $(this).addClass('false-answer');
            $('.option').each( function() {
                if ($(this).val() == answer) 
                    $(this).addClass('true-answer');
            })
            setTimeout(roundAnnouce, 2000);
        }
    })
}

const inputDisabled = (contact) => {
    $('.option').each(function() {
        $(this).prop('disabled', contact);
    });
}

const showResult = (answer) => {
    setTimeout(clearResult, 3000);
    setTimeout(roundAnnouce, 2000);
    $('.option').each( function() {
        if ($(this).val() == answer) $(this).addClass('true-answer');
    })
}

const clearResult = () => {
    $('.option').each(function() {
        $(this).removeClass('true-answer false-answer');
    })
}

const endGame = () => {

}

const arrayShuffle = (array) => {
    let currentIndex = array.length-1;
    let randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.ceil(Math.random() * currentIndex);
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        currentIndex--;
    }
    return array;
}

let temp = 1;
const changePic = (i) => {
    temp += i;
    if (temp < 0) temp = pokemonList.length - 1;
    let imgNum = temp > 99 ? temp :
                 temp > 9 ? '0' + temp :
                 '00' + temp;
    let url = '../image/Pokemon\ image/' + imgNum + '.png';
    $('.question').css('background-image', `url('${url}')`);
}