
var giphyApiKey ='J8fRct3OW7QU4jMboikDWt88lbtNWlfY';
var url = 'api.giphy.com/v1/gifs/';
var search = 'search?';
var limit = 6;


const pokedex = new Vue({
    el: '#pokedex',
    data: {
        gifs: [],
        query: '6',
        dexData: [],
        dexSpecies: [],
        evolution: [],
        evolutionChain: [],
    },
    methods: {
        updateDex: function() {
            if (typeof this.query === 'string'){
                this.query = this.query.toLowerCase().trim();
            }
            fetch(`https://pokeapi.co/api/v2/pokemon/${this.query}`)
            .then(response => response.json())
            .then(json => {
                this.dexData = json
                
                //Gifs must be requested after pokeapi so you don't search the number on giphy
                const endpoint = `https://${url}${search}api_key=${giphyApiKey}&q=${this.dexData.name}&limit=${limit}`;  
                fetch(endpoint)
                .then(response => response.json())
                .then(json => {
                    this.gifs = json.data
                })
            })

            fetch(`https://pokeapi.co/api/v2/pokemon-species/${this.query}`)
            .then(response => response.json())
            .then(json => {
                this.dexSpecies = json
                fetch(this.dexSpecies.evolution_chain.url)
                .then(response => response.json())
                .then(json => {
                    this.evolution = json
                    this.evolutionChain=json.chain
                })
            })

        },
        updateDexLink: function(q) {
            if (q === 'random'){
                this.query=Math.floor(Math.random() * 898)+1; 

            }
            else {
                this.query=q;
            }
            if (typeof this.query === 'string'){
                this.query = this.query.toLowerCase().trim();
            }

            //basic overview
            fetch(`https://pokeapi.co/api/v2/pokemon/${this.query}`)
            .then(response => response.json())
            .then(json => {
                this.dexData = json
                
                //Gifs must be requested after pokeapi so you don't search the number on giphy
                const endpoint = `https://${url}${search}api_key=${giphyApiKey}&q=${this.dexData.name}&limit=${limit}`;  
                fetch(endpoint)
                .then(response => response.json())
                .then(json => {
                    this.gifs = json.data
                })
            })

            //dex data and evolutionary chain
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${this.query}`)
            .then(response => response.json())
            .then(json => {
                this.dexSpecies = json
                fetch(this.dexSpecies.evolution_chain.url)
                .then(response => response.json())
                .then(json => {
                    this.evolution = json
                    this.evolutionChain=json.chain
                })
            })
        }

    
        
    },
    created() {

        //basic overview
        fetch(`https://pokeapi.co/api/v2/pokemon/${this.query}`)
        .then(response => response.json())
        .then(json => {
            this.dexData = json
            //Gifs must be requested after pokeapi
            //So you don't search the number on giphy
            const endpoint = `https://${url}${search}api_key=${giphyApiKey}&q=${this.dexData.name}&limit=${limit}`;  
            fetch(endpoint)
            .then(response => response.json())
            .then(json => {
                this.gifs = json.data
            })
        })

        //dex data and evolutionary chain
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${this.query}`)
        .then(response => response.json())
        .then(json => {
            this.dexSpecies = json
            fetch(this.dexSpecies.evolution_chain.url)
            .then(response => response.json())
            .then(json => {
                this.evolution = json
                this.evolutionChain=json.chain
            })
        })
    }
})

/*

         getSprite: function(pokemon) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            .then(response => response.json())
            .then(json => {
                this.sprite = json.sprites.front_default;
            })

        } 
*/



    