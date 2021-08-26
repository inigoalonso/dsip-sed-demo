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
          <v-tab>
            Value
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
        <v-container>
          <v-row>
            <Table/>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-form>
                <v-container>
                  <v-row>
                    <h2>Performance criteria weights</h2>
                  </v-row>
                  <v-row>
                    <v-slider
                      v-model="weights.thermalCriterion"
                      label="Thermal"
                      max="10"
                      min="0"
                      step="1"
                      ticks="always"
                      tick-size="4"
                      :tick-labels="ticksLabels"
                      color="red"
                      track-color="red"
                    ></v-slider>
                  </v-row>
                  <v-row>
                    <v-slider
                      v-model="weights.volumeCriterion"
                      label="Volume"
                      max="10"
                      min="0"
                      step="1"
                      ticks="always"
                      tick-size="4"
                      :tick-labels="ticksLabels"
                      color="pink"
                      track-color="pink"
                    ></v-slider>
                  </v-row>
                  <v-row>
                    <v-slider
                      v-model="weights.weightCriterion"
                      label="Weight"
                      max="10"
                      min="0"
                      step="1"
                      ticks="always"
                      tick-size="4"
                      :tick-labels="ticksLabels"
                      color="purple"
                      track-color="purple"
                    ></v-slider>
                  </v-row>
                  <v-row>
                    <h2>Sustainability criteria weights</h2>
                  </v-row>
                  <v-row>
                    <v-slider
                      v-model="weights.amountCriterion"
                      label="Amount of material"
                      max="10"
                      min="0"
                      step="1"
                      ticks="always"
                      tick-size="4"
                      :tick-labels="ticksLabels"
                      color="teal"
                      track-color="teal"
                    ></v-slider>
                  </v-row>
                  <v-row>
                    <v-slider
                      v-model="weights.recyclabilityCriterion"
                      label="Recyclability"
                      max="10"
                      min="0"
                      step="1"
                      ticks="always"
                      tick-size="4"
                      :tick-labels="ticksLabels"
                      color="green"
                      track-color="green"
                    ></v-slider>
                  </v-row>
                  <v-row>
                    <v-slider
                      v-model="weights.supplyCriterion"
                      label="Supply Chain Risk"
                      max="10"
                      min="0"
                      step="1"
                      ticks="always"
                      tick-size="4"
                      :tick-labels="ticksLabels"
                      color="light-green"
                      track-color="light-green"
                    ></v-slider>
                  </v-row>
                </v-container>
              </v-form>
            </v-col>
            <v-col cols="6">
              <div id="barChart">
                <apexchart type="bar" height="500" :options="barChartOptions" :series="barChartSeries"></apexchart>
              </div>
            </v-col>
          </v-row>
        </v-container>
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
              <Mug v-bind:weights="weights"/>
            </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-row>
          <v-col cols="6">
                <div id="scatterChart">
                  <apexchart type="scatter" height="350" :options="scatterChartOptions" :series="scatterSeries"></apexchart>
                </div>
          </v-col>
          <v-col cols="6">
                <div id="radarChart">
                  <apexchart type="radar" height="400" :options="radarChartOptions" :series="radarSeries"></apexchart>
                </div>
          </v-col>
          <v-col cols="12">
                  <v-data-table
                    v-model="selected"
                    :headers="headers"
                    :items="designs"
                    item-key="name"
                    show-select
                  >
                  </v-data-table>
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item>
        <v-row>
          <v-col cols="12">
            <div class="d-flex flex-column justify-space-between align-center">
              <v-img
                max-height="600"
                max-width="900"
                src="/surplusValue.png"
              ></v-img>
            </div>
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
      weights: {
        thermalCriterion: 5,
        volumeCriterion: 5,
        weightCriterion: 5,
        amountCriterion: 5,
        recyclabilityCriterion: 5,
        supplyCriterion: 5,
      },
      ticksLabels: [0,1,2,3,4,5,6,7,8,9,10],
      tab: null,
      selected: [],
      designs: [],
      headers: [
        {text: "Design name", value: "name"},
        {text: "Handle", value: "handle"},
        {text: "Material", value: "material"},
        {text: "Volume", value: "volume"},
        {text: "Weight", value: "weight"},
        {text: "Performance", value: "performance"},
        {text: "Sustainability", value: "sustainability"},
        {text: "Total score", value: "total"},
        {text: "Creator", value: "creator"},
      ],
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
        xaxis: {
          type: 'category',
          categories: ['Performance', 'Sustainability', 'Total']
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
      barChartOptions: {
        chart: {
          type: 'bar',
          height: 300,
          stacked: true,
          stackType: '100%'
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }],
        xaxis: {
          labels: {
            show: false
          },
          categories: ['Thermal','Volume','Weight','Amount of material','Recyclability','Supply chain risk'],
        },
        fill: {
          opacity: 1
        },
        legend: {
          position: 'right',
          offsetX: 0,
          offsetY: 50
        },
        colors:['#8BC34A', '#4CAF50', '#009688', '#9C27B0', '#E91E63', '#F44336'],
      },
    }
  },
  computed: {
    barChartSeries () {
      return [
        {
          name: "Supply chain risk",
          data: [this.weights.supplyCriterion]
        },
        {
          name: "Recyclability",
          data: [this.weights.recyclabilityCriterion]
        },
        {
          name: "Amount of material",
          data: [this.weights.amountCriterion]
        },
        {
          name: "Weight",
          data: [this.weights.weightCriterion]
        },
        {
          name: "Volume",
          data: [this.weights.volumeCriterion]
        },
        {
          name: "Thermal",
          data: [this.weights.thermalCriterion]
        }
      ]
    },
    project () {
      return this.$store.getters.project
    },
    userIsOwner () {
      let user = this.$store.getters.user
      if (user.slug == this.project.person) {
        return true
      } else {
        return false
      }
    },
    radarSeries () {
      var series = []
      for (let index = 0; index < this.selected.length; index++) {
        const element = this.selected[index];
        series.push(
        {
          name: element.name,
          data: [element.performance,element.sustainability,element.total]
        })
      }
      return series
    },
    scatterSeries () {
      var series = []
      for (let index = 0; index < this.selected.length; index++) {
        const element = this.selected[index];
        series.push(
        {
          name: element.name,
          data: [{x:element.performance,y:element.sustainability,z:element.total}]
        })
      }
      return series
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
        criteria: this.project.criteria,
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

