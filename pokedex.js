

const pokedex = new Vue({
    el: '#pokedex',
    data: {
        gifs: [],
        query: '6',
        dexData: [],
        dexSpecies: [],
        evolution: [],
        evolutionChain: []
    },
    methods: {
        updateDex: function() {
                    var apiKey ='J8fRct3OW7QU4jMboikDWt88lbtNWlfY';
        var url = 'api.giphy.com/v1/gifs/';
        var search = 'search?';
        var limit = 6;
        if (typeof this.query === 'string'){
            this.query = this.query.toLowerCase().trim();
        }

        

        //basic overview
        fetch(`https://pokeapi.co/api/v2/pokemon/${this.query}`)
        .then(response => response.json())
        .then(json => {
            this.dexData = json
            
            //Gifs must be requested after pokeapi so you don't search the number on giphy
            const endpoint = `https://${url}${search}api_key=${apiKey}&q=${this.dexData.name}&limit=${limit}`;  
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
        var apiKey ='J8fRct3OW7QU4jMboikDWt88lbtNWlfY';
        var url = 'api.giphy.com/v1/gifs/';
        var search = 'search?';
        var limit = 6;

        

        //basic overview
        fetch(`https://pokeapi.co/api/v2/pokemon/${this.query}`)
        .then(response => response.json())
        .then(json => {
            this.dexData = json
            
            //Gifs must be requested after pokeapi
            //So you don't search the number on giphy
            const endpoint = `https://${url}${search}api_key=${apiKey}&q=${this.dexData.name}&limit=${limit}`;  
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

