import React from 'react'
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
  Tooltip,
  ListItemSecondaryAction,
  PaperProps
} from 'src/components/atoms'
import { Delete as DeleteIcon, Close as CloseIcon } from '@material-ui/icons'
import { useSelector, useDispatch } from 'src/store'
import { removePlace, removeAllPlaces } from 'src/store/places'
import { useTheme } from '@material-ui/core'
import Modal from './modal'
import TreeMapChart from './tree_map_chart'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<any>>
  paperProps?: PaperProps
}

const PlacesModal: React.FC<Props> = ({ open, setOpen, paperProps }) => {
  const places = useSelector((state) => state.places)
  const dispatch = useDispatch()
  const theme = useTheme()

  return (
    <Modal open={open} setOpen={setOpen} paperProps={paperProps}>
      <Box height="100%">
        <Box
          height={places.some((e) => e) ? 0.5 : 1}
          display="flex"
          flexDirection="column"
        >
          <Box display="flex" alignItems="center" mb={3}>
            <Typography>Places</Typography>
            <Tooltip title="Trash">
              <IconButton
                aria-label="Trash"
                data-testid="list-reminders-icon-button-delete-all"
                onClick={() => dispatch(removeAllPlaces())}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Box flex={1} />
            <IconButton
              aria-label="Close"
              onClick={() => setOpen(false)}
              data-testid="places-modal-icon-button-close"
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <List
            mb={3}
            width={1}
            border={1}
            color="grey.400"
            borderRadius={theme.shape.borderRadius}
            css={{ flex: 1, overflow: 'auto' }}
          >
            {places.map((place, count) => (
              <ListItem button key={place.id}>
                <ListItemText
                  data-testid={`places-modal-list-item-text-${count}`}
                  color="text.primary"
                >
                  <Typography
                    mr={1}
                    data-testid={`places-modal-typography-list-item-title-${count}`}
                  >
                    {place.name}
                  </Typography>
                </ListItemText>
                <ListItemSecondaryAction>
                  <Box display="flex" alignItems="center">
                    <Tooltip title="Delete">
                      <IconButton
                        aria-label="Delete"
                        onClick={() => dispatch(removePlace(places, place.id))}
                        data-testid={`places-modal-icon-button-delete-${count}`}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Box>
        <TreeMapChart />
      </Box>
    </Modal>
  )
}

export default PlacesModal
