<template>
  <v-card
    class="mx-auto my-12"
  >
    <v-toolbar
      color="green"
      dark
      flat
    >

      <v-toolbar-title>Project: {{ project ? project.title : 'Project Title' }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="closeProject">
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs
          v-model="tab"
          background-color="green"
          centered
        >
          <v-tabs-slider color="white"></v-tabs-slider>

          <v-tab>
            Details
          </v-tab>
          <v-tab>
            Criteria
          </v-tab>
          <v-tab>
            Design
          </v-tab>
          <v-tab>
            Alternatives
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-form v-if="project">
                <v-container>
                    <v-row>
                        <v-col cols="12" md="4">
                          <v-text-field v-model="project.title" label="Project title" required :disabled=!userIsOwner></v-text-field>
                          <v-text-field v-model="project.status" label="Status" required :disabled=!userIsOwner></v-text-field>
                          <v-text-field v-model="project.person" label="Person" required disabled></v-text-field>
                          <v-text-field v-model="project.id" label="id" required disabled></v-text-field>
                        </v-col>

                        <v-col cols="12" md="8">
                          <v-textarea v-model="project.description" label="Description" required :disabled=!userIsOwner></v-textarea>
                          <v-switch v-model="project.shared" :label="`Shared project`" required :disabled=!userIsOwner></v-switch>
                        </v-col>
                        <v-col cols="12">
                          <v-flex justify="space-around">
                            <v-btn
                              color="success"
                              class="mr-4"
                              @click="saveProjectChanges()"
                              :loading="loadingProject"
                              :disabled=!userIsOwner
                            >
                              Save changes
                            </v-btn>
                            
                            <!-- <v-btn
                              color="warning"
                              class="mr-4"
                              @click="discardProjectChanges()"
                              :loading="loadingProject"
                            >
                              Discard changes
                            </v-btn> -->
                            
                            <v-btn
                              color="error"
                              class="mr-4"
                              @click="deleteProject()"
                              :disabled=!userIsOwner
                            >
                              Delete project
                            </v-btn>
                          </v-flex>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <Table/>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-title>Enhanced Function-Means Model</v-card-title>
          <v-card-text>
            <v-expansion-panels popout>
              <v-expansion-panel>
                <v-expansion-panel-header>E F-M tree example</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <img src="/efm.svg" alt="EFM of mug" width="100%">
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
        <v-card flat>
          <v-card-title>Create new design alternative</v-card-title>
          <v-card-text>
                  <Mug/>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-row>
<!--           <v-col cols="6">
            <v-card>
              <v-card-title>
                <span class="text-h5">Heatmap</span>
              </v-card-title>

              <v-card-text>
                <div id="heatmapChart">
                  <apexchart type="heatmap" height="400" :options="heatmapChartOptions" :series="series"></apexchart>
                </div>
              </v-card-text>
            </v-card>
          </v-col> -->
          <v-col cols="6">
<!--            <v-card>
              <v-card-title>
                <span class="text-h5">Radar chart</span>
              </v-card-title>

              <v-card-text> -->
                <div id="radarChart">
                  <apexchart type="radar" height="400" :options="radarChartOptions" :series="series"></apexchart>
                </div>
<!--               </v-card-text>
            </v-card> -->
          </v-col>
          <v-col cols="6">
<!--            <v-card>
              <v-card-title>
                <span class="text-h5">Scatter chart</span>
              </v-card-title>

              <v-card-text> -->
                <div id="scatterChart">
                  <apexchart type="scatter" height="350" :options="scatterChartOptions" :series="scatterSeries"></apexchart>
                </div>
<!--               </v-card-text>
            </v-card> -->
          </v-col>
          <v-col cols="12">
            <v-card
              max-width="1280"
              class="mx-auto my-3"
            >
              <!-- <v-card-title>Collected designs</v-card-title> -->
              <v-card-text>
                <v-simple-table>
                  <thead>
                    <tr>
                      <!-- <th class="text-center">H1</th>
                      <th class="text-center">D1</th>
                      <th class="text-center">D2</th>
                      <th class="text-center">T1</th>
                      <th class="text-center">T2</th>
                      <th class="text-center">S1</th> -->
                      <th class="text-center">Handle</th>
                      <th class="text-center">Material</th>
                      <th class="text-center">Volume</th>
                      <th class="text-center">Weight</th>
                      <th class="text-center">Timestamp</th>
                      <th class="text-center">Creator</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in designs" :key="item.uuid">
                      <!-- <td>{{ item.height }}</td>
                      <td>{{ item.diameterTop }}</td>
                      <td>{{ item.diameterBottom }}</td>
                      <td>{{ item.mugThickness }}</td>
                      <td>{{ item.handleThickness }}</td>
                      <td>{{ item.handleSeparation }}</td> -->
                      <td>{{ item.handle }}</td>
                      <td>{{ item.material }}</td>
                      <td>{{ item.volume }}</td>
                      <td>{{ item.weight }}</td>
                      <td>{{ item.createdOn.seconds }}</td>
                      <td>{{ item.creator }}</td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="green"
                  text
                  @click="createMug"
                >
                  Create new
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs-items>
  <div class="view-project">



    <v-snackbar v-model="snackbarUpdatedProject" :timeout="4000" top color="success">
      <span>Awesome! You updated the project.</span>
      <v-btn color="white" text @click="snackbarUpdatedProject = false">Close</v-btn>
    </v-snackbar>

    <v-snackbar v-model="snackbarDeletedProject" :timeout="4000" top color="success">
      <span>Awesome! You deleted the project.</span>
      <v-btn color="white" text @click="snackbarDeletedProject = false">Close</v-btn>
    </v-snackbar>

  </div>
  </v-card>
</template>

<script>
import db from '@/fb'
import router from '@/router'
import Table from './Table';
import Mug from '../Mug';

export default {
  name: 'ViewProjectDSIP',
  components: {
    Table,
    Mug,
  },
  data(){
    return{
      tab: null,
      designs: [],
      loadingProject: false,
      snackbarUpdatedProject: false,
      snackbarDeletedProject: false,
      series: [
        {
          name: "Option 1",
          data: [{
            x: 'Performance',
            y: 22
          }, {
            x: 'Sustainability',
            y: 42
          }, {
            x: 'Total',
            y: 32
          }]
        },
        {
          name: "Option 2",
          data: [{
            x: 'Performance',
            y: 2
          }, {
            x: 'Sustainability',
            y: 12
          }, {
            x: 'Total',
            y: 7
          }]
        }
      ],
      scatterSeries: [
        {
          name: "Designs",
          data: [{
            x: 11,
            y: 22
          }, {
            x: 5,
            y: 29
          }, {
            x: 26,
            y: 3
          }, {
            x: 60,
            y: 42
          }]
        }
      ],
      heatmapChartOptions: {
        chart: {
          height: 450,
          type: 'heatmap',
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          type: 'category',
          categories: ['Performance', 'Sustainability', 'Total'],
          position: 'top'
        },
        grid: {
          padding: {
            right: 20
          }
        }
      },
      radarChartOptions: {
        chart: {
          height: 450,
          type: 'radar',
        },
        dataLabels: {
          enabled: false
        },
        yaxis: {
          type: 'category',
          categories: ['Option 1', 'Option 2', 'Option 3', 'Option 4']
        },
        grid: {
          padding: {
            right: 20
          }
        },
        legend: {
          show: false
        }
      },
      scatterChartOptions: {
        chart: {
          height: 350,
          type: 'scatter',
          zoom: {
            enabled: false,
            type: 'xy'
          }
        },
        xaxis: {
          min: 0,
          max: 100,
          tickAmount: 10,
          labels: {
            formatter: function(val) {
              return parseFloat(val).toFixed(1)
            }
          },
          title: {
            text: "Performance"
          },
          type: 'numeric'
        },
        yaxis: {
          min: 0,
          max: 100,
          tickAmount: 10,
          title: {
            text: "Sustainability"
          }
        },
        legend: {
          show: false
        }
      },
    }
  },
  computed: {
    project () {
      return this.$store.getters.project
    },
    userIsOwner () {
      let user = this.$store.getters.user
      //console.log(user)
      //console.log(this.project.person)
      if (user == this.project.person) {
        //console.log(true)
        return true
      } else {
        //console.log(false)
        return false
      }
    },
  },
  methods: {
    deleteProject(){
      db.collection('projects').doc(this.$route.params.id).delete().then(() => {
        this.snackbarDeletedProject = true;
        //delete all the mugs related to the project
        db.collection('mugs').where('projectId', '==', this.$route.params.id)
          .get()
          .then(function(querySnapshot) {
            // Once we get the results, begin a batch
            var batch = db.batch();
            querySnapshot.forEach(function(doc) {
              // For each doc, add a delete operation to the batch
              batch.delete(doc.ref);
            });

            // Commit the batch
            return batch.commit();
          })
          .then(function() {
            router.push('/dashboard');
          });
      })
      .catch(function(error) {
          //console.error("Error deleting project: ", error);
      });
    },
    saveProjectChanges(){
      // save to db
      this.loadingProject = true
      const project = { 
        title: this.project.title,
        person: this.project.person,
        status: this.project.status,
        description: this.project.description,
        shared: this.project.shared,
      }
      db.collection('projects').doc(this.$route.params.id).set(project).then(() => {
        this.loadingProject = false
        this.snackbarUpdatedProject = true;
      })
      .catch(function(error) {
          //console.error("Error writing document: ", error);
      });

    },
    closeProject(){
      this.$router.push({ name: 'Dashboard' })
    },
    createMug(){
      this.$router.push({ name: 'Mug' })
    },
    fetchData() {
      
      // data & firebase hook-up
      var data = [];

      db.collection('mugs').onSnapshot(res=> {

        res.docChanges().forEach(change => {

          const doc = change.doc.data();

          switch (change.type) {
            case 'added':
              data.push(doc);
              break;
            case 'modified': {
              const index = data.findIndex(item => item.id == doc.id);
              data[index] = doc;
              break;
            }
            case 'removed':
              data = data.filter(item => item.id !== doc.id);
              break;
            default:
              break;
          }

        });
        this.designs = data.filter(design => {
          return design.projectId == this.project.id
        });

      });
    },
  },
  created(){
    this.$store.dispatch('setProjectAction', this.$route.params.id)
  },
  mounted(){
    this.fetchData();
  },
}
</script>

<style>

</style>

