<template>
  <v-data-table
    :headers="headers"
    :items="criteria"
    sort-by="total"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Criteria</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="green"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Criterion
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.description"
                      label="Description"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-select
                      v-model="editedItem.type"
                      label="Type"
                      :items="types"
                    ></v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.origin"
                      label="Origin"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-select
                      v-model="editedItem.type"
                      label="Type"
                      :items="types"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="green darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="green darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="green"
        dark
        @click="initialize"
      >
        Reset example data
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Criterion',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Description', value: 'description' },
        { text: 'Origin', value: 'origin' },
        { text: 'Type', value: 'type' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      criteria: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        performance: 0,
        sustainability: 0,
        total: 0,
      },
      defaultItem: {
        name: '',
        performance: 0,
        sustainability: 0,
        total: 0,
      },
      types: ['Performance', 'Sustainability'],
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.criteria = [
          {
            name: 'Thermal',
            slug: 'thermal',
            description: 'Maximize the time the drink is warm.',
            type: 'Performance',
            weight: 6,
            origin: 'Market survey',
          },
          {
            name: 'Volume',
            slug: 'volume',
            description: 'Stay as close as possible to an ideal volume of 400ml.',
            type: 'Performance',
            weight: 2,
            origin: 'Market survey',
          },
          {
            name: 'Weight',
            slug: 'weight',
            description: 'Stay as close as possible to an ideal weight of 250g.',
            type: 'Performance',
            weight: 1,
            origin: 'Ergonomics',
          },
          {
            name: 'Amount of material',
            slug: 'amount-of-material',
            description: 'Minimize the amount of material used.',
            type: 'Sustainability',
            weight: 5,
            origin: 'Production',
          },
          {
            name: 'Recyclability',
            slug: 'recyclability',
            description: 'Maximize the recyclability of the product.',
            type: 'Sustainability',
            weight: 4,
            origin: 'Life-Cycle Analysis',
          },
/*           {
            name: 'Emissions',
            slug: 'emissions',
            description: 'Minimize the CO2 emissions from manufacturing.',
            type: 'Sustainability',
            weight: 3,
          }, */
          {
            name: 'Supply chain risk',
            slug: 'supply-chain-risk',
            description: 'Limit the risk (low: traceable, renewable, reusable, robust delivery/provision) on the sourcing of materials/components.',
            type: 'Sustainability',
            weight: 3,
            origin: 'Sourcing Department',
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.criteria.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.criteria.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.criteria.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.criteria[this.editedIndex], this.editedItem)
        } else {
          this.criteria.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>