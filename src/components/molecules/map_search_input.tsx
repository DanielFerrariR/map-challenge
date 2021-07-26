import React from 'react'
import { Search as SearchIcon, Menu as MenuIcon } from '@material-ui/icons'
import {
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Box,
  InputBase,
  CircularProgress
} from 'src/components/atoms'
import { Badge } from '@material-ui/core'
import { useSelector, useDispatch } from 'src/store'
import { addPlace } from 'src/store/places'
import { countriesAPI, AxiosGetCountriesResponse } from 'src/services'
import PlacesModal from './places_modal'

const MAX_BADGE_NUMBER = 99
const REGIONS = ['africa', 'americas', 'asia', 'europe', 'oceania']
const TYPING_DELAY = 1000
const ANIMATION_DELAY = 500

const MapSearchInput: React.FC = () => {
  const [loading, setLoading] = React.useState(false)
  const [openModal, setOpenModal] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState<AxiosGetCountriesResponse>([])
  const [searchText, setSearchText] = React.useState('')
  const searchTimeout = React.useRef<NodeJS.Timeout>()
  const places = useSelector((state) => state.places)
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current)
    }

    if (!searchText) return

    const asyncEffect = async () => {
      try {
        setLoading(true)

        await new Promise((resolve) => setTimeout(resolve, ANIMATION_DELAY))

        let response

        if (REGIONS.includes(searchText.toLocaleLowerCase())) {
          response = await countriesAPI.get<AxiosGetCountriesResponse>(
            `/region/${searchText}`
          )
        } else {
          response = await countriesAPI.get<AxiosGetCountriesResponse>(
            `/name/${searchText}`
          )
        }

        setOptions(response.data)
      } catch (error) {
        setOptions([])
      } finally {
        setLoading(false)
      }
    }

    searchTimeout.current = setTimeout(async () => {
      asyncEffect()
    }, TYPING_DELAY)

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current)
      }
    }
  }, [searchText])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value)
    setOpen(true)
  }

  const handleClick = (option: AxiosGetCountriesResponse[0]) => () => {
    const { name, latlng, population } = option
    dispatch(
      addPlace(places, {
        name,
        latlng,
        population
      })
    )
    setSearchText('')
  }

  return (
    <>
      <Paper
        py={0.25}
        px={0.5}
        display="flex"
        alignItems="center"
        width={1}
        maxWidth="400px"
      >
        <IconButton
          data-testid="map-search-input-menu-button"
          aria-label="menu"
          onClick={() => setOpenModal(true)}
        >
          <Badge
            badgeContent={
              places.length && (
                <span data-testid="map-search-input-menu-badge">
                  {places.length > MAX_BADGE_NUMBER ? 99 : places.length}
                </span>
              )
            }
            color="primary"
          >
            <MenuIcon />
          </Badge>
        </IconButton>
        <InputBase
          data-testid="map-search-input-base"
          style={{ marginLeft: 8, flex: 1 }}
          placeholder="Search countries"
          inputProps={{ 'aria-label': 'Input a country name' }}
          value={searchText}
          onChange={handleChange}
        />
        <Box
          height={48}
          width={48}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {loading ? <CircularProgress size={24} /> : <SearchIcon />}
        </Box>
      </Paper>
      {open && searchText.length > 0 && options.length > 0 && (
        <Paper>
          <List mt={1} maxHeight={256} css={{ overflow: 'auto' }}>
            {options.map((option, index) => (
              <ListItem
                data-testid={`map-search-input-list-item-option-${index}`}
                key={index}
                button
                onClick={handleClick(option)}
              >
                <ListItemText primary={option.name} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
      <PlacesModal open={openModal} setOpen={setOpenModal} />
    </>
  )
}

export default MapSearchInput
