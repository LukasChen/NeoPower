<template>
  <div class="row">
    <div class="col-sm-7">
      <slick :options="{autoplay: true,autoplaySpeed: 4000,dots: true}" >
        <div v-for="image in product.images">
          <!-- {{image}} -->
          <img :src="image.src">
        </div>
        <!-- <div>
          <img :src="product.images[1].src">
        </div> -->
      </slick>
    </div>
    <div class="col-sm-5" v-once>
      <h1>{{product.title}}</h1>
    </div>
  </div>
</template>


<script>
import Client from 'shopify-buy';
import Slick from 'vue-slick';

export default {
  data: () => ({
    product: {}
  }),
  components: {
    Slick,
  },
  mounted() {
    console.log('mounted');
    const client = Client.buildClient({
      domain: 'villagetronic.myshopify.com',
      storefrontAccessToken: 'd6715a05ef40e01bac9c9be862a17c74',
      // appId: 6
    });

    // console.log(client.product.fetchAll());

    const productId = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzIyNTc0OTYzNDI1ODc=';

    // client.product.fetchAll().then(products => {
    //   console.log(products);
    // })

    client.product.fetch(productId).then(product => {
      console.log(product);
      this.product = product;
    })
  }
}
</script>

