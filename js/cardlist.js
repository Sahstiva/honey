Vue.component('cards', {
    props: ['cards'],
    template:   `<div class="content__wrapper">
                <card v-for = "(user, index) in cards" 
                :key = "user.id"
                :user = "user"
                :index = "index">
                </card>
                </div>`
});

Vue.component('card', {
    props: ['user', 'index'],
    template:   `<div class="card w-100">
                    <div    class="card-body"
                            :class="index % 2 ? 'content__item-green' : 'content__item-gray'">
                        <h5 class="card-title content__heading"
                            :class="index % 2 ? 'content__heading-green' : 'content__heading-gray'">{{ user.name }}</h5>
                        <h6 class="card-subtitle mb-2 text-muted content__email">{{ user.email }}</h6>
                        <p class="card-text content__text">{{ user.message }}</p>
                    </div>
                </div>`
});