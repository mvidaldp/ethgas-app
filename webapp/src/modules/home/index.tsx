import React from 'react'
import { Styled, Box, Flex, Text } from '~/style'
import { LineChart } from './LineChart'
import { Switcher } from '~/style'
import { useStore, DataStore } from '~/stores'
import { DataMode } from '~/stores/DataStore'
import { env } from '~/env'

export const HomeRoute = () => {
  const dataStore = useStore<DataStore>('data')

  return (
    <Box
      sx={{
        // '*': { border: '1px dashed #ccc' }
        pt: 4,
        px: [0, 0, 5],
    }}>

      <Box sx={{
        color: 'white',
        fontSize: 4,
        fontWeight:'heading',
        textAlign: 'center',
        pt: [1, 1, 4],
        pb: [2, 2, 4]
      }}>
        {env.networkName} Gas Price Gauge
      </Box>

      <Flex type='centered-row' sx={{ mt: 2, mb: 3 }}>
        <Switcher
          option1={{value: DataMode.SUGGESTED, label: "Suggested"}}
          option2={{value: DataMode.ACTUAL, label: "Actual"}}
          onChange={(v: DataMode) => dataStore.mode.set(v)}
        />
      </Flex>

      <Flex type='centered-row' sx={{
        flexWrap: 'nowrap',
        m: 1
      }}>

        {dataStore.mode.get() === DataMode.SUGGESTED && 
          <>
            <GasStat label={"Fast"} gasPrice={dataStore.suggestedFast.get()} bgColor={'red'} />
            <GasStat label={"Standard"} gasPrice={dataStore.suggestedStandard.get()} bgColor={'green'} />
            <GasStat label={"Slow"} gasPrice={dataStore.suggestedSlow.get()} bgColor={'yellow'} />
          </>
        }

        {dataStore.mode.get() === DataMode.ACTUAL && 
          <>
            <GasStat label={"Max"} gasPrice={dataStore.actualMax.get()} bgColor={'red'} />
            <GasStat label={"Average"} gasPrice={dataStore.actualAverage.get()} bgColor={'green'} />
            <GasStat label={"Min"} gasPrice={dataStore.actualMin.get()} bgColor={'yellow'} />
          </>
        }

      </Flex>

      <Box sx={{
        textAlign: 'center',
        pt: 4,
        mx: 'auto',
        // width: '80%',
        height: '400px'
      }}>
        <LineChart mode={dataStore.mode.get()} data={dataStore.chartData()} />
      </Box>

      {/* <Box sx={{
        mt: 5,
        mx: 5,
        backgroundColor: '#222',
        borderRadius: '15px',
        color: 'white',
        p: 3,
        textAlign: 'center',
        fontSize: 2
      }}>
        <Styled.h3>API</Styled.h3>
        hello
      </Box> */}

      {/* FOOTER */}
      <Box sx={{
        mx: 'auto',
        mt: 4,
        mb: 1,
        py: 3,
        width: ['80%', '80%', '600px'],
        borderTop: '2px dotted #666',
        fontSize: 12,
        textAlign: 'center'
      }}>
        Fork it <Styled.a target="_blank" href="https://github.com/0xsequence/ethgas-app">github.com/0xsequence/ethgas-app</Styled.a>,
        by <Styled.a target="_blank" href="https://horizon.io">Horizon.io</Styled.a>
      </Box>

    </Box>
  )
}

const GasStat = ({
  label,
  gasPrice,
  usdPrice,
  bgColor
}: {
  label: string,
  gasPrice: number,
  usdPrice?: string,
  bgColor: string,
}) => {
  return (
    <Box
      sx={{
        width: '300px',
        border: '2px solid #666',
        borderRadius: '10px',
        backgroundColor: bgColor,
        m: [1, 1, 2],
        p: [1, 1, 3],
        // m: 2,
        // p: 3,
        textAlign: 'center',
        verticalAlign: 'middle',
      }}
    >
      <Box sx={{
        color: 'background', fontWeight: 'bold', fontSize: [2, 2, 4, 4]
      }}>
        {label}
      </Box>

      <Box sx={{
        color: 'white', fontWeight: 'heading', fontSize: [3, 3, 5, 5]
      }}>
        {gasPrice} <Text sx={{ color: '#fff', fontSize: '10px', lineHeight: '0', pb: '10px' }}>Gwei</Text>
      </Box>
    </Box>
  )
}
