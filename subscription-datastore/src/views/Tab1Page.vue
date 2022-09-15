<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <!-- iOSにおいて通常のtitle -->
        <!-- iOSで適用されないヘッダー -->
        <ion-title>Tab だよ!</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <!-- iOSにおいてlarge-title -->
      <!-- iOSで適用されるヘッダー -->
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1です！ 変更しました</ion-title>
        </ion-toolbar>
      </ion-header>
      <ExploreContainer name="Tab 1 page" />
      <ion-grid>
        <ion-row>
          <ion-col size-xs="3">
            <div>1 of 3</div>
          </ion-col>
          <ion-col size-xs="3">
            <div>2 of 3</div>
          </ion-col>
          <ion-col size-xs="3">
            <div>3 of 3</div>
          </ion-col>
        </ion-row>
      </ion-grid>
      <div>
          <h1>Chat App</h1>
          <input type="text" v-model="content" placeholder="Todo name">
          <button @click="addContent">送信</button>
          <ul>
            <li v-for="message in messages" :key="message?.id">
              {{ message.content }}
            </li>
          </ul>
        </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { Chat } from '../models'
import { DataStore } from 'aws-amplify'
import ExploreContainer from '@/components/ExploreContainer.vue';

export default  defineComponent({
  name: 'Tab1Page',
  components: { ExploreContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonGrid, IonRow, IonCol },
  setup () {
    const content = ref<string>()
    const addContent = async() => {
      if(!content.value) return
      const data = await DataStore.save(new Chat({ content: content.value }))
      console.log(data)
      content.value = ''
    }
    const messages = ref<Chat[]>()
    onMounted(async() => {
      const chatMessage = await DataStore.query(Chat)
      if (chatMessage) {
          messages.value = chatMessage as Chat[]
      }
      console.log('messages', messages.value)
    })
    return {
      content,
      addContent,
      messages
    }
  }
});
</script>
