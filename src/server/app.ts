import express from 'express'
import path from 'path'
import moment from 'moment'
import axios, { AxiosResponse } from 'axios'
import csvParse from 'csv-parse/lib/sync'

const port = 8080
const app = express()
app.use(express.static('dist'))

app.get(/.*/, (req: express.Request, res: express.Response) => {
  res.sendFile(path.resolve('dist/index.html'))
})
app.listen(port, () => console.log(`Listening at http://localhost:${port}`))

const dataApp = express()
const covidDataAxios = axios.create({
  baseURL:
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/'
})
dataApp.post('/update_db', (req, res) => {
  const dayString = moment()
    .utc()
    .subtract(1, 'days')
    .format('MM-DD-YYYY')
  const url = `/${dayString}.csv`
  console.log(url)

  covidDataAxios
    .get(url)
    .then(({ data }) => {
      console.log(data)
      const jsonData = csvParse(data as string, {
        columns: true,
        on_record: (record, val) => ({
          Country: record['Country/Region'].replace('Mainland ', ''),
          Confirmed: record.Confirmed,
          Deaths: record.Deaths,
          Recovered: record.recovered
        })
      }) as Array<{ Country: string }>
      res.send(jsonData)
    })
    .catch(err => {
      console.error(err)
      res.status(400).send(err)
    })
})

const apiPort = 3000

dataApp.listen(apiPort, () =>
  console.log(`Listening at http://localhost:${apiPort}`)
)
