<template>
  <div class="projects">
    <h1 class="subtitle-1 grey--text">Projects</h1>

    <v-container class="my-5">
      <v-expansion-panels>
        <v-expansion-panel v-for="project in projects" :key="project.title">
          <v-expansion-panel-header class="py-1">{{ project.title }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card-text class="px-4 grey--text">
              <p><span class="font-weight-bold">Owner</span> {{ project.person }}</p>
              <p><span class="font-weight-bold">Status</span> {{ project.status }}</p>
              <p><span class="font-weight-bold">Description</span> {{ project.description }}</p>
            </v-card-text>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
    
  </div>
</template>

<script>
import db from '@/fb'

export default {
  name: 'Projects',
  data() {
    return {
      projects: []
    }
  },
  computed: {
    myProjects() {
      return this.projects.filter(project => {
        return project.person === 'aaaa' && project.status != 'complete'
      })
    }
  },
  created() {
    db.collection('projects').onSnapshot(res => {
      const changes = res.docChanges();

      changes.forEach(change => {
        if (change.type === 'added') {
          this.projects.push({
            ...change.doc.data(),
            id: change.doc.id
          })
        }
      });
    })
  }
}
</script>
