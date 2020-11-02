<template>
  <v-container
    fluid
    class="fill-height flex-column align-stretch pa-6"
  >
    <v-row>
      <v-col
        cols="12"
        xl="6"
      >
        <v-card>
          <v-card-title>
            Contributions
          </v-card-title>
          <v-card-text>
            <client-only>
              <apexchart
                type="line"
                :height="240"
                :options="options"
                :series="series"
              />
            </client-only>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="6"
        xl="3"
      >
        <v-card>
          <v-card-title>
            TODO
          </v-card-title>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="6"
        xl="3"
      >
        <v-card>
          <v-card-title>
            title
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card v-if="!$vuetify.breakpoint.mobile">
          <v-card-title>
            Raw Data
          </v-card-title>
          <v-card-text>
            <code><pre>{{ log }}</pre></code>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { isSameDay, format } from 'date-fns'
import Log from '~/utils/git'
export default {
  data() {
    return {
      log: Log,
    }
  },
  computed: {
    logs() {
      if (!this.log || !this.log.length) { return [] }
      const logs = [...this.log].reverse()
      let theDate = format(new Date(logs[0].date), 'yyyy-MM-dd')
      let count = 0
      const result = []
      for (const log of logs) {
        const date = log.date
        if (theDate && isSameDay(new Date(theDate), new Date(date))) {
          count++
        } else {
          result.push({ date: theDate, count })
          theDate = format(new Date(date), 'yyyy-MM-dd')
          count = 1
        }
      }
      result.push({ date: theDate, count })
      return result
    },
    series() {
      return [{ name: 'Contributions', data: this.logs.map(l => l.count) }]
    },
    options() {
      return {
        xaxis: { categories: this.logs.map(l => l.date) },
        stroke: {
          curve: 'smooth',
        },
      }
    },
  },
}
</script>
