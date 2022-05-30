'use strict';

const vue = Vue.createApp({
    props: {
    },
    data() {
        return {
            products: [],
            apiUrl: 'http://localhost:8080/api/'
        }
    },
    mounted: function () {
        this.GetProducts();
    },
    methods: {
        //sort product list
        Sort() {
            this.products.sort((a, b) => b.votes - a.votes);
        },
        //get product list
        GetProducts() {
            axios.get(this.apiUrl + 'products')
                .then(function (res) {
                    if (res.status === 200) {
                        vue.products = res.data;
                        vue.Sort();
                    } else {
                        console.log('getting product list fail.')
                    }
                });
        },
        //vote product
        Vote(pid) {
            console.log(pid);
            let index = this.products.findIndex(x => x.id === pid);
            if (index > -1) {
                this.products[index].votes++;
                vue.Sort();
            }
            //send to server
            axios.post(this.apiUrl + 'vote', {
                id: pid
            })
            .then(function (res) {
                if (res.status !== 200) {
                    console.log('vote post fail.');
                }
            });
        },
    }
}).mount('#app');
