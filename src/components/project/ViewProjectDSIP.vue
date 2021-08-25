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
          <img src="/efm.svg" alt="EFM of mug">
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

          </v-card-text>
        </v-card>
        <v-card flat>
          <v-card-title>Create new</v-card-title>
          <v-card-text>
            <Mug/>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-row>
          <v-col cols="6">
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
          </v-col>
          <v-col cols="6">
            <v-card>
              <v-card-title>
                <span class="text-h5">Radar chart</span>
              </v-card-title>

              <v-card-text>
                <div id="radarChart">
                  <apexchart type="radar" height="400" :options="radarChartOptions" :series="series"></apexchart>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card>
              <v-card-title>
                <span class="text-h5">Scatter chart</span>
              </v-card-title>

              <v-card-text>
                <div id="scatterChart">
                  <apexchart type="scatter" height="350" :options="scatterChartOptions" :series="series"></apexchart>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card
              max-width="1280"
              class="mx-auto my-3"
            >
              <v-card-title>Collected designs</v-card-title>
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
      searchPerformanceRequirements: '',
      searchSustainabilityRequirements: '',
      headersPerformanceRequirements: [
        { text: 'Name', value: 'name', align: 'left' },
        { text: 'Description', value: 'description' },
        { text: 'Weight', value: 'weight' },
      ],
      headersSustainabilityRequirements: [
        { text: 'Name', value: 'name', align: 'left' },
        { text: 'Description', value: 'description' },
        { text: 'Weight', value: 'weight' },
      ],
      performanceRequirements: [
        {
          name: 'Keep heat',
          description: 'Maximize the time the drink is warm.',
          weight: 3,
        },
        {
          name: 'Volume',
          description: 'Stay as close as possible to an ideal volume of 400ml.',
          weight: 2,
        },
        {
          name: 'Weight',
          description: 'Stay as close as possible to an ideal weight of 250g.',
          weight: 1,
        },
      ],
      sustainabilityRequirements: [
        {
          name: 'Amount of material',
          description: 'Minimize the amount of material used.',
          weight: 1,
        },
        {
          name: 'Recyclability',
          description: 'Maximize the recyclability of the product.',
          weight: 2,
        },
        {
          name: 'Emissions from manufacturing',
          description: 'Minimize the CO2 emissions from manufacturing.',
          weight: 3,
        },
        {
          name: 'Supply chain risk',
          description: 'Limit the risk (low: traceable, renewable, reusable, robust delivery/provision) on the sourcing of materials/components.',
          weight: 3,
        },
      ],
      series: [
        {
          name: "Performance",
          data: [{
            x: 'Option 1',
            y: 22
          }, {
            x: 'Option 2',
            y: 29
          }, {
            x: 'Option 3',
            y: 3
          }, {
            x: 'Option 4',
            y: 42
          }]
        },
        {
          name: "Sustainability",
          data: [{
            x: 'Option 1',
            y: 21
          }, {
            x: 'Option 2',
            y: 13
          }, {
            x: 'Option 3',
            y: 43
          }, {
            x: 'Option 4',
            y: 37
          }]
        },
        {
          name: "Total",
          data: [{
            x: 'Option 1',
            y: 43
          }, {
            x: 'Option 2',
            y: 42
          }, {
            x: 'Option 3',
            y: 46
          }, {
            x: 'Option 4',
            y: 79
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
          categories: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
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
        xaxis: {
          type: 'category',
          categories: ['Option 1', 'Option 2', 'Option 3', 'Option 4']
        },
        grid: {
          padding: {
            right: 20
          }
        }
      },
      scatterChartOptions: {
        chart: {
          height: 350,
          type: 'scatter',
          zoom: {
            enabled: true,
            type: 'xy'
          }
        },
        xaxis: {
          tickAmount: 10,
          labels: {
            formatter: function(val) {
              return parseFloat(val).toFixed(1)
            }
          }
        },
        yaxis: {
          tickAmount: 7
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
      console.log(user)
      console.log(this.project.person)
      if (user == this.project.person) {
        console.log(true)
        return true
      } else {
        console.log(false)
        return false
      }
    },
  },
  methods: {
    deleteProject(){
      db.collection('projects').doc(this.$route.params.id).delete().then(() => {
        this.snackbarDeletedProject = true;
        //delete all the nodes related to the project
        db.collection('nodes').where('project', '==', this.$route.params.id)
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

        this.designs = data;

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

