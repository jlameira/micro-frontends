<template>
 <div class="cotainer">
   <div class="notification">
      <h1 class="title" align="center">
        {{ count }}
      </h1>
   </div>
    <hr />
  <div align="left" >
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-primary" v-on:click="localIncrement()">Local Increment</button>
          &nbsp;Send a <b>local</b> increment event. <br/>
        </div>
      </div>
      <hr />
      <div class="field is-grouped">
          <div class="control">
            <button class="button is-primary" v-on:click="localDecrement()">Local Decremente</button>
            &nbsp;Send a <b>local</b> increment event. <br/>
          </div>
      </div>
 <hr />
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-primary" v-on:click="globalIncrement()">Global Increment</button>
          &nbsp;Send a <b>local</b> increment event. <br/>
        </div>
      </div>
      <hr />
      <div class="field is-grouped">
          <div class="control">
            <button class="button is-primary" v-on:click="globalDecrement()">Global Decrement</button>
            &nbsp;Send a <b>local</b> increment event. <br/>
          </div>
      </div>
  </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import store from '../store';
import * as type from './mutationTypes/types';


export default {
 computed: mapState({
      count: function(state){
        if(state.count < 0){
          state.count = 0;
          return state.count;
        }
       return state.count;
     }
    }),
    methods: {
        localIncrement(){
          store.dispatch({
            type: type.Increment,
            amount: 1
          })
        },
        localDecrement(){
          store.dispatch({
            type: type.Decrement,
            amount: 1
          })
        },
        globalIncrement(){
          this.localIncrement()
          this.$root.globalEventDistributor.dispatch({type:type.GlobalIncrement})
        },
        globalDecrement(){
          this.localDecrement();
         this.$root.globalEventDistributor.dispatch({type:type.GlobalDecrement})
        }
    }
}
</script>
