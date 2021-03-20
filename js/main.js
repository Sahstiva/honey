const API = 'http://127.0.0.1:5500/api';

const app = new Vue({
    el: '#app',
    data: {
        dataUrl: '/data.json',
        cards: [],
        userName: '',
        userEmail: '',
        userMessage: ''
    },
    methods: {
    getJson(url) {
        return fetch(url)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
        },
    addCard() {
        if(this.userName && this.userEmail && this.userMessage) {
            let newID = this.cards.reduce( (sum,item) => sum + item.id, 0)
            let item = {
                "id": newID,
                "name": this.userName,
                "email": this.userEmail,
                "message": this.userMessage,
                "itemtheme": `card-body content__item-${ newID % 2 ? "green" : "gray"}`,
                "headingtheme": `card-title content__heading content__heading-${ newID % 2 ? "green" : "gray"}`
            };
            this.cards.push(item);
            }
        }
    },
    mounted() {
        this.getJson(`${API + this.dataUrl}`)
            .then(data => {
                for (let el of data) {
                    let itemtheme = `card-body content__item-${ el.id % 2 ? "green" : "gray"}`;
                    let headingtheme = `card-title content__heading content__heading-${ el.id % 2 ? "green" : "gray"}`;
                    const item = Object.assign( {itemtheme: itemtheme, headingtheme: headingtheme}, el);
                    this.cards.push(item);
                }
            });
        }
    });

