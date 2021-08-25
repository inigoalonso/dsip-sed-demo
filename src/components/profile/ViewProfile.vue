<template>
  <div class="view-profile">
    <div v-if="profile" class="card">
      <h1 class="subtitle-1 grey--text">Profile</h1>

      <v-card class="px-3 elevation-0" text>
        <v-layout row wrap class="pa-3">
          <v-flex md12>
      <v-layout column align-center>
        <v-flex class="mt-5 text-center">
          <v-avatar size="200">
            <img :src="avatarUrl" alt="Random avatar">
          </v-avatar>
        </v-flex>
      </v-layout>
          </v-flex>
          <v-flex xs12 md6>
            <div class="caption grey--text">Name</div>
            <div>{{ profile.name }}</div>
          </v-flex>
          <v-flex xs12 md6>
            <div class="caption grey--text">Email</div>
            <div>{{ profile.email }}</div>
          </v-flex>
          <v-flex xs12 md6>
            <div class="caption grey--text">User ID</div>
            <div>{{ profile.user_id }}</div>
          </v-flex>
          <v-flex xs12 md6>
            <div class="caption grey--text">Organization</div>
            <div>{{ profile.organization }}</div>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>

    </div>
  </div>
</template>

<script>
import db from '@/fb'

export default {
  name: 'ViewProfile',
  data(){
    return{
      profile: null
    }
  },
  computed: {
    avatarUrl () {
      return "https://avatars.dicebear.com/api/bottts/"+ this.profile.user_id +".svg"//+"?colors[]=green&colors[]=lightGreen&colors[]=lime"
    },
  },
  created(){
    let ref = db.collection('users')
    ref.doc(this.$route.params.id).get()
    .then(user => {
      this.profile = user.data()
    })
  }
}
</script>

<style>

</style>

