var app;
window.onload = function () {
    app = new Vue({
        el: '#weatherApp', // cible l'élement HTML où nous pourrons utiliser toutes les variables ci-dessous
        data: {
            // sera utilisé comme indicateur de chargement de l'application
            loaded: false,

            // cityName, variable utilisé dans le formulaire via v-model
            formCityName: '',
            removeCityButton: '',

            message: 'WebApp Loaded.',
            messageForm: '',

            // liste des villes saisies, initialiser avec Paris
            cityList: [{
                name: 'Paris'
            }],

            // cityWeather contiendra les données météo reçus par openWeatherMap
            cityWeather: null,

            // indicateur de chargement
            cityWeatherLoading: false,
            openCard: false
        },

        // 'mounted' est exécuté une fois l'application VUE totalement disponible
        // Plus d'info. sur le cycle de vie d'une app VUE : 
        // https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram
        mounted: function () {
            this.loaded = true;
            this.readData();
        },

        // ici, on définit les methodes qui vont traiter les données décrites dans DATA
        methods: {
            readData: function (event) {
                console.log('JSON.stringify(this.cityList)', JSON.stringify(this.cityList)); // va afficher la liste des villes
                // JSON.stringify permet transfomer une liste en chaine de caractère
                console.log('this.loaded:', this.loaded); // va afficher 'this.loaded: true'
            },

            /*isCityExist: async function (_city){
                x = false
                listCities = JSON.parse(JSON.stringify(this.cityList))

                await listCities.forEach(element => {
                    if (_city === element.name) { x = true; return }
                });

                return x
            },*/

            isCityExist: function (_cityName) {
                if (this.cityList.filter(item =>
                    item.name.toUpperCase() == _cityName.toUpperCase()
                ).length > 0) {
                    return true;
                } else {
                    return false;
                }
            },

            addCity: function (event) {
                event.preventDefault(); // pour ne pas recharger la page à la soumission du formulaire
                console.log('formCityName:', this.formCityName);

                if (this.isCityExist(this.formCityName)) {
                    this.messageForm = 'existe déjà';
                }
                else {
                    this.cityList.push({ name: this.formCityName });
                    // remise à zero du message affiché sous le formulaire
                    this.messageForm = '';
                    // remise à zero du champ de saisie
                    this.formCityName = '';
                }
            },
            remove: function (_city) {
                this.cityList = this.cityList.filter(item => item.name != _city.name);
            },

            meteo: function (_city) {

                if(this.removeCityButton){this.removeCityButton=false; return}

                this.cityWeatherLoading = true;
                if (!this.openCard) {
                    // appel AJAX avec fetch
                    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + _city.name + '&units=metric&lang=fr&apikey=d8b776ece016b830373c4557e946b7ed')
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (json) {
                            app.cityWeatherLoading = false;
                            app.openCard = true;

                            if (json.cod === 200) {
                                // on met la réponse du webservice dans la variable cityWeather
                                app.cityWeather = json;
                                app.message = null;
                            } else {
                                app.cityWeather = null;
                                app.message = 'Météo introuvable pour ' + _city.name
                                    + ' (' + json.message + ')';
                            }
                        });

                } else { this.openCard = this.cityWeatherLoading = false }
            }
        }
    });
}
