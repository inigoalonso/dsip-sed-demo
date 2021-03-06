<template>
  <v-container pa-0>
    <v-row
      text-center
      no-gutters
    >
      <v-col>
        <v-row no-gutters>
          <v-col md="12">
            <v-row>
              <h3>Configuration</h3>
            </v-row>
            <v-row>
              <v-col md="6">
                <svg 
                  :height="height+130" 
                  width="312"
                  style="display:block;margin:auto;"
                >
                  <defs>
                    <linearGradient 
                      id="body_gradient" 
                      gradientUnits="userSpaceOnUse" 
                      :x1="this.gradientPoints[0]" 
                      :y1="this.gradientPoints[1]" 
                      :x2="this.gradientPoints[2]" 
                      :y2="this.gradientPoints[3]" 
                    >
                      <stop offset="0%" :style="this.gradientOffsetStyle( this.material['colorLight'] )"/>
                      <stop offset="50%" :style="this.gradientOffsetStyle( this.material['colorHighlight'] )"/>
                      <stop offset="100%" :style="this.gradientOffsetStyle( this.material['colorLight'] )"/>
                    </linearGradient>
                  </defs>
                  <text :x="cx" y="15" text-anchor="middle" fill="#03A9F4">{{ mugVolume }} ml</text>
                  <text :x="cx" y="30" text-anchor="middle" fill="#FF5722">{{ mugWeight }} g</text>
                  <ellipse 
                    id="mugBottom" 
                    :cx="cx" 
                    :cy="80+this.height" 
                    :rx="diameterBottom/2" 
                    :ry="diameterBottom/4" 
                    :style="lightStyle" 
                  />
                  <path
                    v-if="this.diameterTop>this.diameterBottom"
                    id="mugHandle1"
                    :style="handleStyle"
                    :d="handle"
                  />
                  <path 
                    id="mugBody" 
                    :style="lightStyle" 
                    :d="mugBody"
                  />
                  <path
                    v-if="this.diameterTop<=this.diameterBottom"
                    id="mugHandle2"
                    :style="handleStyle"
                    :d="handle"
                  />
                  <ellipse 
                    id="mugTop" 
                    :cx="cx" 
                    cy="80" 
                    :rx="diameterTop/2" 
                    :ry="diameterTop/4" 
                    :style="mediumStyle" 
                  />
                  <ellipse 
                    id="mugTopHole" 
                    :cx="cx" 
                    cy="80" 
                    :rx="diameterTop/2-mugThickness" 
                    :ry="diameterTop/4-mugThickness/2" 
                    :style="darkStyle" 
                  />
                  Sorry, your browser does not support inline SVG.  
                </svg>
              </v-col>
              <v-col md="6">
                <v-container fluid class="py-0">
                  <v-row>
                    <v-col cols="12" class="py-0">
                      <v-row>
                        <v-col cols="6" class="pt-0">
                          <v-select
                            v-model="selectedMaterial"
                            :items="mugMaterials"
                            label="Material"
                            :menu-props="{ top: true, offsetY: true }"
                          >
                          </v-select>
                        </v-col>
                        <v-col cols="6" class="pt-0">
                          <v-select
                            v-model="selectedHandle"
                            :items="handleTypes"
                            label="Handle"
                            :menu-props="{ top: true, offsetY: true }"
                          >
                          </v-select>
                        </v-col>
                      </v-row>
                      <v-slider
                        v-model="height"
                        thumb-size="24"
                        thumb-label="always"
                        min="40"
                        max="160"
                        label="H1"
                      >
                        <template v-slot:prepend>
                          <v-icon
                            @click="decrementHeight"
                          >
                            mdi-minus
                          </v-icon>
                        </template>

                        <template v-slot:append>
                          <v-icon
                            @click="incrementHeight"
                          >
                            mdi-plus
                          </v-icon>
                        </template>
                      </v-slider>
                      <v-slider
                        v-model="diameterTop"
                        thumb-size="24"
                        thumb-label="always"
                        min="40"
                        max="160"
                        label="D1"
                      >
                        <template v-slot:prepend>
                          <v-icon
                            @click="decrementDiameterTop"
                          >
                            mdi-minus
                          </v-icon>
                        </template>

                        <template v-slot:append>
                          <v-icon
                            @click="incrementDiameterTop"
                          >
                            mdi-plus
                          </v-icon>
                        </template>
                      </v-slider>
                      <v-slider
                        v-model="diameterBottom"
                        thumb-size="24"
                        thumb-label="always"
                        min="40"
                        max="160"
                        label="D2"
                      >
                        <template v-slot:prepend>
                          <v-icon
                            @click="decrementDiameterBottom"
                          >
                            mdi-minus
                          </v-icon>
                        </template>

                        <template v-slot:append>
                          <v-icon
                            @click="incrementDiameterBottom"
                          >
                            mdi-plus
                          </v-icon>
                        </template>
                      </v-slider>
                      <v-slider
                        v-model="mugThickness"
                        thumb-size="24"
                        thumb-label="always"
                        min="1"
                        max="10"
                        step="0.5"
                        label="T1"
                      >
                        <template v-slot:prepend>
                          <v-icon
                            @click="decrementMugThickness"
                          >
                            mdi-minus
                          </v-icon>
                        </template>

                        <template v-slot:append>
                          <v-icon
                            @click="incrementMugThickness"
                          >
                            mdi-plus
                          </v-icon>
                        </template>
                      </v-slider>
                      <v-slider
                        v-model="handleThickness"
                        thumb-size="24"
                        thumb-label="always"
                        min="1"
                        max="20"
                        step="0.5"
                        label="T2"
                      >
                        <template v-slot:prepend>
                          <v-icon
                            @click="decrementHandleThickness"
                          >
                            mdi-minus
                          </v-icon>
                        </template>

                        <template v-slot:append>
                          <v-icon
                            @click="incrementHandleThickness"
                          >
                            mdi-plus
                          </v-icon>
                        </template>
                      </v-slider>
                      <v-slider
                        v-model="handleSeparation"
                        thumb-size="24"
                        thumb-label="always"
                        min="10"
                        max="50"
                        step="1"
                        label="S1"
                      >
                        <template v-slot:prepend>
                          <v-icon
                            @click="decrementHandleSeparation"
                          >
                            mdi-minus
                          </v-icon>
                        </template>

                        <template v-slot:append>
                          <v-icon
                            @click="incrementHandleSeparation"
                          >
                            mdi-plus
                          </v-icon>
                        </template>
                      </v-slider>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
            <v-row>
              <h3>Analysis</h3>
            </v-row>
            <v-row>
              <v-col md="4" class="text-center">
                <h3>Performance</h3>
                <div>
                  <v-progress-circular
                    :rotate="-900"
                    :size="100"
                    :width="15"
                    :value="performance"
                    color="red"
                  >
                    {{ performance }}
                  </v-progress-circular>
                </div>
                <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-header>
                      Additional info
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <p class="subtitle-2">Environment</p>
                      <v-slider
                        v-model="Troom"
                        thumb-size="24"
                        thumb-label="always"
                        min="0"
                        max="40"
                        step="1"
                        label="Room temperature"
                      >
                        <template v-slot:prepend>
                          <v-icon
                            @click="decrementTroom"
                          >
                            mdi-minus
                          </v-icon>
                        </template>

                        <template v-slot:append>
                          <v-icon
                            @click="incrementTroom"
                          >
                            mdi-plus
                          </v-icon>
                        </template>
                      </v-slider>
                      <v-slider
                        v-model="Tbrewing"
                        thumb-size="24"
                        thumb-label="always"
                        min="90"
                        max="100"
                        step="1"
                        label="Brewing temperature"
                      >
                        <template v-slot:prepend>
                          <v-icon
                            @click="decrementTbrewing"
                          >
                            mdi-minus
                          </v-icon>
                        </template>

                        <template v-slot:append>
                          <v-icon
                            @click="incrementTbrewing"
                          >
                            mdi-plus
                          </v-icon>
                        </template>
                      </v-slider>
                      <p class="subtitle-2">Desired temperature range</p>
                      <v-range-slider
                        v-model="temperatureRange"
                        thumb-size="24"
                        thumb-label
                        :min="Troom"
                        :max="Tbrewing"
                        step="1"
                      ></v-range-slider>
                      <p>Time to reach {{temperatureRange[0]}} ºC: <span class="font-weight-bold">{{time2coffee (temperatureRange[0]).toFixed(2)}} s</span></p>
                      <p>Time to reach {{temperatureRange[1]}} ºC: <span class="font-weight-bold">{{time2coffee (temperatureRange[1]).toFixed(2)}} s</span></p>
                      <p class="subtitle-2">Desired waiting time</p>
                      <v-slider
                        v-model="waitingTime"
                        thumb-size="24"
                        thumb-label
                        min="0"
                        max="1200"
                        step="1"
                        label="(s)"
                      >
                        <template v-slot:prepend>
                          <v-icon
                            @click="decrementWaitingTime"
                          >
                            mdi-minus
                          </v-icon>
                        </template>

                        <template v-slot:append>
                          <v-icon
                            @click="incrementWaitingTime"
                          >
                            mdi-plus
                          </v-icon>
                        </template>
                      </v-slider>
                      <p>Temperature: <span class="font-weight-bold">{{ Tcoffee(waitingTime).toFixed(2) }} ºC</span> after {{Math.floor(waitingTime / 60)}} minutes and {{waitingTime-60*Math.floor(waitingTime / 60)}} seconds.</p>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>
              <v-col md="4" class="text-center">
                <h3>Sustainability</h3>
                <div>
                  <v-progress-circular
                    :rotate="-900"
                    :size="100"
                    :width="15"
                    :value="sustainability"
                    color="green"
                  >
                    {{ sustainability }}
                  </v-progress-circular>
                </div>
                <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-header>
                      Additional info
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      Material amount: {{ mugWeight }} g
                      <br>
                      Material recyclability: {{ material.recyclability }}
                      <br>
                      Material criticality: {{ material.criticality }}
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>
              <v-col md="4" class="text-center">
                <h3>Total</h3>
                <div>
                  <v-progress-circular
                    :rotate="-900"
                    :size="100"
                    :width="15"
                    :value="total"
                    color="blue"
                  >
                    {{ total }}
                  </v-progress-circular>
                </div>
                <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-header>
                      Additional info
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="text-left">
                      Total Value score calculated with the weights assigned to the different criteria:
                      <ul>
                        <li>Thermal: {{ this.weights.thermalCriterion }}</li>
                        <li>Volume: {{ this.weights.volumeCriterion }}</li>
                        <li>Weight: {{ this.weights.weightCriterion }}</li>
                        <li>Amount of material: {{ this.weights.amountCriterion }}</li>
                        <li>Recyclability: {{ this.weights.recyclabilityCriterion }}</li>
                        <li>Supply chain risk: {{ this.weights.supplyCriterion }}</li>
                      </ul>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="6">
              </v-col>
              <v-col md="6">
                <!-- <p class="subtitle-2">Amount of material</p>
                <p>Weight: <span class="font-weight-bold">{{ mugWeight }} g</span> of <span class="font-weight-bold">{{ selectedMaterial }}</span></p>
                <p>Score:: <span class="font-weight-bold">{{ 2+2 }}</span></p>
                <p class="subtitle-2">Recyclability</p>
                <p>Score:: <span class="font-weight-bold">{{ 2+2 }}</span></p>
                <p class="subtitle-2">Emissions from manufacturing</p>
                <p>Score:: <span class="font-weight-bold">{{ 2+2 }}</span></p> -->
              </v-col>
            </v-row>
            <v-row>
              <h3>Save design</h3>
            </v-row>
            <v-row>
              <v-col md="6">
                <v-text-field
                  v-model="designName"
                  label="Design name"
                  clearable
                  append-icon="mdi-shuffle"
                  @click:append="randomizeName"
                ></v-text-field>
              </v-col>
              <v-col md="6">
                <v-btn @click="submitDesign" color="primary" large>Submit</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <div class="text-center">
      <v-overlay :value="overlay">
        <v-progress-circular
          v-if="uploading"
          :size="70"
          :width="7"
          color="blue-grey"
          indeterminate
        ></v-progress-circular>
        <span v-if="!uploading">Design uploaded!</span>
        <br>
        <v-btn
          icon
          @click="overlay = false"
          v-if="!uploading"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-overlay>
    </div>

  </v-container>
</template>

<script>
import db from '@/fb'
import router from '@/router'

  export default {
    components: {
    },
    props: ['weights'],
    data () {
      return {
        designName: null,
        loadingMug: false,
        snackbarUpdatedMug: false,
        snackbarDeletedMug: false,
        analysis: undefined,
        Troom: 20,
        Tbrewing: 95,
        temperatureRange: [50,65],
        waitingTime: 60,
        selectedMaterial: 'Ceramic',
        mugMaterials: [
          {
            text:'Ceramic',
            value: 'Ceramic',
            density: 0.004, // g/mm3
            colorHighlight: '#EFEBE9',
            colorLight: '#BCAAA4',
            colorMedium: '#8D6E63',
            colorDark: '#3E2723',
            thermalExpansion: 10, // *10^-6/K
            thermalConductivity: 3.8, // W/m*K
            fractureToughness: 1.05, // MPa m^1/2
            strenght: 100, // MPa
            recyclability: 0.65, // https://doi.org/10.1016/S0921-3449(02)00056-3
            criticality: 0.90,
          },
          {
            text:'Steel',
            value: 'Steel',
            density: 0.008, // g/mm3
            colorHighlight: '#ECEFF1',
            colorLight: '#B0BEC5',
            colorMedium: '#546E7A',
            colorDark: '#263238',
            thermalExpansion: 18, // *10^-6/K
            thermalConductivity: 50, // W/m*K
            fractureToughness: 50, // MPa m^1/2
            strenght: 1000, // MPa
            recyclability: 1.05, // https://doi.org/10.1016/S0921-3449(02)00056-3
            criticality: 0.30,
          },
          {
            text:'Aluminium',
            value: 'Aluminium',
            density: 0.0027, // g/mm3
            colorHighlight: '#F5F5F5',
            colorLight: '#E0E0E0',
            colorMedium: '#BDBDBD',
            colorDark: '#616161',
            thermalExpansion: 18, // *10^-6/K
            thermalConductivity: 205, // W/m*K
            fractureToughness: 21, // MPa m^1/2
            strenght: 300, // MPa
            recyclability: 0.85, // https://doi.org/10.1016/S0921-3449(02)00056-3
            criticality: 0.50,
          },
          {
            text:'Polypropylene',
            value: 'Polypropylene',
            density: 0.00085, // g/mm3
            colorHighlight: '#EF9A9A',
            colorLight: '#EF5350',
            colorMedium: '#E53935',
            colorDark: '#B71C1C',
            thermalExpansion: 80, // *10^-6/K
            thermalConductivity: 0.11, // W/m*K
            fractureToughness: 3.3, // MPa m^1/2
            strenght: 60, // MPa
            recyclability: 0.95, // https://doi.org/10.1016/S0921-3449(02)00056-3
            criticality: 0.10,
          },
          {
            text:'Glass',
            value: 'Glass',
            density: 0.008, // g/mm3
            colorHighlight: '#E3F2FD',
            colorLight: '#90CAF9',
            colorMedium: '#42A5F5',
            colorDark: '#90CAF9',
            thermalExpansion: 7.6, // *10^-6/K
            thermalConductivity: 1.1, // W/m*K
            fractureToughness: 0.75, // MPa m^1/2
            strenght: 1500, // MPa
            recyclability: 0.72, // https://doi.org/10.1016/S0921-3449(02)00056-3
            criticality: 0.30,
          },
        ],
        selectedHandle: 'Rounded',
        handleTypes: ['Rounded', 'Rectangular', 'Open'],
        height: 100,
        diameterTop: 100,
        diameterBottom: 100,
        mugThickness: 5.5,
        handleThickness: 10.5,
        handleSeparation: 30,
        mugDensity: 0.004, // g/mm3
        uploading: false,
        overlay: false,
        error: null,
      }
    },
    computed: {
      sumWeights () {
        var sum = 0
        Object.values(this.weights).forEach(weight => {
          sum = sum + weight
        });
        console.log("Sum of all weights = "+sum)
        return sum
      },
      projectId () {
        var projectId = this.$store.getters.project.id
        return projectId
      },
      mug () {
        return this.$store.getters.mug
      },
      gradientPoints() {
        var Ax = this.cx - 0.5 * this.diameterTop
        var Ay = 80
        var Bx = this.cx - 0.5 * this.diameterBottom
        var By = 80 + this.height * 1.5
        var dx = Ax - Bx
        var dy = Ay - By
        var dist = Math.sqrt(dx*dx+dy*dy)
        dx /= dist
        dy /= dist
        var x1 =   Ay - dy
        var y1 = -(Ax - dx)
        var x2 =   By + dy
        var y2 = -(Bx + dx)
        return [x1, y1, x2, y2]
      },
      material() {
        var material = this.mugMaterials.filter(obj => { return obj.value === this.selectedMaterial })[0];
        return material
      },
      lightStyle() { 
        //return "fill:" + this.material['colorLight'] + ";stroke:none;" 
        return "fill: url(#body_gradient);stroke:none;"
      },
      mediumStyle() { 
        return "fill:" + this.material['colorMedium'] + ";stroke:none;" 
      },
      darkStyle() { 
        return "fill:" + this.material['colorDark'] + ";stroke:none;" 
      },
      handleStyle() {
        var style = "fill:none;stroke:" + this.material['colorMedium'] + ";stroke-width:" + this.handleThickness + ";stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;"
        return style
      },
      cx() { return (312 / 2); },
      mugBody() {
        var topLeft = (this.cx - this.diameterTop/2).toString()
        var topRight = (this.cx + this.diameterTop/2).toString()
        var bottomLeft = (this.cx - this.diameterBottom/2).toString()
        var bottomRight = (this.cx + this.diameterBottom/2).toString()
        var d = "M " + topLeft + ",80 H " + topRight + " L " + bottomRight + "," + (80+this.height).toString() + " H " + bottomLeft + " Z"
        return d;
      },
      handle() {
        var x
        if (this.diameterTop < this.diameterBottom) {
          x = (this.cx + this.diameterTop/2).toString()
        } else {
          x = (this.cx + this.diameterBottom/2).toString()
        }
        var i = ((this.height - 40)/2).toString()
        var endY = (100 + this.height - 40).toString()
        var d = ""
        if (this.selectedHandle == 'Rounded') {
          d = "m " + x + ",100 q " + this.handleSeparation + " 0 " + this.handleSeparation + " " + i + " T " + x + "," + endY;
        } else if (this.selectedHandle == 'Rectangular') {
          d = "m " + x + ",100 h " + this.handleSeparation + " V " + endY + " h -" + this.handleSeparation;
        } else if (this.selectedHandle == 'Open') {
          var endX = (parseInt(x) + this.handleSeparation).toString()
          // if (this.height >= 80) {
          //   var midY = 40
          // } else {
            var midY = (this.height - 40) / 4
          // }
          d = "m " + x + ",100 q " + this.handleSeparation + " 0 " + this.handleSeparation + " " + midY + " T " + endX + "," + endY;
        }
        return d
      },
      mugVolume() {
        return ((Math.PI * (this.height - this.mugThickness) * (((this.diameterTop-2*this.mugThickness)+(this.diameterBottom-2*this.mugThickness))/4)**2)/1000).toFixed(2)
      },
      mugArea() {
        var TotalArea = Math.PI * (this.height * (this.diameterTop + this.diameterBottom)/2 + (this.diameterTop/2)**2 + (this.diameterBottom/2)**2)
        return TotalArea
      },
      mugWeight() {
        var v1 = (Math.PI * this.height * ((this.diameterTop+this.diameterBottom)/4)**2).toFixed(2)
        var v2 = this.mugVolume * 1000 // convert from ml to mm3
        var lHandle = 2 * this.handleSeparation + this.height;
        if (this.selectedHandle == 'Rounded') {
          lHandle = lHandle * 0.7
        } else if (this.selectedHandle == 'Rectangular') {
          lHandle = lHandle * 1
        } else if (this.selectedHandle == 'Open') {
          lHandle = lHandle * 0.55
        }
        var vHandle = (this.handleThickness/2)**2*Math.PI*lHandle;
        return ((v1-v2+vHandle)*this.material['density']).toFixed(2)
      },
      performance () {
        var thermalPerformance = Math.exp((this.time2coffee(this.temperatureRange[0]))/200)
        if (this.selectedMaterial == "Polypropylene") {
          thermalPerformance = 40 
        }
        console.log(this.mugVolume)
        var volumePerformance = 2000 / (Math.abs(200-this.mugVolume)+5)
        var weightPerformance= 7700 / (Math.abs(250-this.mugWeight)+5)
        var result = ( thermalPerformance + volumePerformance + weightPerformance ) / 5
        console.log(this.weights.thermalCriterion)
        return Math.floor(result)
      },
      sustainability () {
        var amountMaterial = 7700 / (Math.abs(0-this.mugWeight)+5)
        var typeMaterial = this.material.recyclability * 100 
        var supplyChain = this.material.criticality * 100
        var result = ( amountMaterial + typeMaterial + supplyChain ) / 5
        return Math.floor(result)
      },
      total () {
        var a = this.weights.thermalCriterion + this.weights.volumeCriterion + this.weights.weightCriterion
        var b = this.weights.amountCriterion + this.weights.recyclabilityCriterion + this.weights.supplyCriterion

        return Math.floor(( this.performance * a + this.sustainability * b) / (a+b))
      },
    },
    methods: {
      capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      },
      randomizeName () {
        this.designName = this.capitalizeFirstLetter(this.$faker().lorem.words())
      },
      deleteMug(){
        db.collection('mugs').doc(this.$route.params.id).delete().then(() => {
          this.snackbarDeletedMug = true;
          router.push('/dashboard');
        })
        .catch(function(error) {
            //console.error("Error deleting mug: ", error);
        });
      },
      saveMugChanges(){
        // save to db
        this.loadingMug = true
        const mug = { 
          title: this.mug.title,
          person: this.mug.person,
          status: this.mug.status,
          description: this.mug.description,
        }
        db.collection('mugs').doc(this.$route.params.id).set(mug).then(() => {
          this.loadingMug = false
          this.snackbarUpdatedMug = true;
        })
        .catch(function(error) {
            //console.error("Error writing document: ", error);
        });

      },
      Tcoffee (t) {
        // Source http://web.mit.edu/21w.732-esg/www/handouts/729_simplified_model_of_heat_loss_in_a_coffee_cup.pdf
        // Thermal energy in the coffee: Q = m * ch * Tcoffee
        var m = this.mugVolume; // Mass of coffee in g (volume in ml * 1000mm3/ml * 0.001g/mm3)
        var ch = 4.184; // Heat capacity of coffee in J/(g ºC)
        var Tcoffee0 = this.Tbrewing; // Temperature of coffee in ºC at t=0
        var Troom = this.Troom; // Temperature of the room in ºC
        var d = this.mugThickness; // Thickness of the insulator in mm
        d = d / 10**3 // From mm to m
        var k = this.material['thermalConductivity']; // Conductivity of the insulator in W/(m ºC)
        var A = this.mugArea; // Cross-sectional area of the insulator in mm2
        A = A / 10**6 // From mm2 to m2
        var tau = (d * m * ch) / (k * A );

        // Radiation is ignored
        // Convection is ignored
        // Conduction is not ignored:
        var Tcoffee = Troom + (Tcoffee0 - Troom) * (Math.E ** (-t/tau))
        return Tcoffee
      },
      time2coffee (T) {
        // Source http://web.mit.edu/21w.732-esg/www/handouts/729_simplified_model_of_heat_loss_in_a_coffee_cup.pdf
        // Thermal energy in the coffee: Q = m * ch * Tcoffee
        var m = this.mugVolume; // Mass of coffee in g (volume in ml * 1000mm3/ml * 0.001g/mm3)
        var ch = 4.184; // Heat capacity of coffee in J/(g ºC)
        var Tcoffee0 = this.Tbrewing; // Temperature of coffee in ºC at t=0
        var Troom = this.Troom; // Temperature of the room in ºC
        var d = this.mugThickness; // Thickness of the insulator in mm
        d = d / 10**3 // From mm to m
        var k = this.material['thermalConductivity']; // Conductivity of the insulator in W/(m ºC)
        var A = this.mugArea; // Cross-sectional area of the insulator in mm2
        A = A / 10**6 // From mm2 to m2
        var tau = (d * m * ch) / (k * A );

        // Radiation is ignored
        // Convection is ignored
        // Conduction is not ignored:
        var Time = - tau * Math.log((T - Troom)/(Tcoffee0 - Troom))
        return Time
      },
      gradientOffsetStyle( color ) {
        return "stop-color: " + color + ";"
      },
      decrementHeight () {
        this.height--
      },
      incrementHeight () {
        this.height++
      },
      decrementDiameterTop () {
        this.diameterTop--
      },
      incrementDiameterTop () {
        this.diameterTop++
      },
      decrementDiameterBottom () {
        this.diameterBottom--
      },
      incrementDiameterBottom () {
        this.diameterBottom++
      },
      decrementMugThickness () {
        this.mugThickness = this.mugThickness - 0.5
      },
      incrementMugThickness () {
        this.mugThickness = this.mugThickness + 0.5
      },
      decrementHandleThickness () {
        this.handleThickness = this.handleThickness - 0.5
      },
      incrementHandleThickness () {
        this.handleThickness = this.handleThickness + 0.5
      },
      decrementHandleSeparation () {
        this.handleSeparation--
      },
      incrementHandleSeparation () {
        this.handleSeparation++
      },
      decrementTbrewing () {
        this.Tbrewing--
      },
      incrementTbrewing () {
        this.Tbrewing++
      },
      decrementTroom () {
        this.Troom--
      },
      incrementTroom () {
        this.Troom++
      },
      decrementWaitingTime () {
        this.waitingTime--
      },
      incrementWaitingTime () {
        this.waitingTime++
      },
      submitDesign: function() {
        var mug = {
          material: this.selectedMaterial,
          handle: this.selectedHandle,
          height: this.height,
          diameterTop: this.diameterTop,
          diameterBottom: this.diameterBottom,
          mugThickness: this.mugThickness,
          handleThickness: this.handleThickness,
          handleSeparation: this.handleSeparation,
          volume: this.mugVolume,
          weight: this.mugWeight,
          createdOn: new Date(),
          creator: this.userName(),
          projectId: this.projectId,
          name: this.designName,
          sustainability: this.sustainability,
          performance: this.performance,
          total: this.total,
          weights: this.weights,
        }
        this.overlay = !this.overlay
        this.uploading = true
        db.collection('mugs').add(mug).then((response) => {
          if (response) {
            //console.log(response)
            this.uploading = false
          }
        }).catch((error) => {
          //console.log(error)
          this.error = error
        })
      },
      userName () {
        let user = this.$store.getters.user
        try {
          return user.name
        } catch {
          return ''
        }
      },
    },
    created(){
      this.$store.dispatch('setMugAction', this.$route.params.id)
    },
    mounted(){
      // Do like in ViewDiagram, including some update function?
      this.randomizeName()
    },
  }
</script>
