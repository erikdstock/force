import React from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { Box, Separator } from "@artsy/palette"
import { ViewingRoomHeaderFragmentContainer as ViewingRoomHeader } from "./Components/ViewingRoomHeader"
import { ViewingRoomClosedFragmentContainer as ViewingRoomClosed } from "./Components/ViewingRoomClosed"
import { ViewingRoomTabBar } from "./Components/ViewingRoomTabBar"
import { createFragmentContainer, graphql } from "react-relay"

import { ViewingRoomApp_viewingRoom } from "v2/__generated__/ViewingRoomApp_viewingRoom.graphql"
import { ViewingRoomMetaFragmentContainer as ViewingRoomMeta } from "./Components/ViewingRoomMeta"
import { Footer } from "v2/Components/Footer"

interface ViewingRoomAppProps {
  children: React.ReactNode
  viewingRoom: ViewingRoomApp_viewingRoom
}

const ViewingRoomApp: React.FC<ViewingRoomAppProps> = ({
  children,
  viewingRoom,
}) => {
  // FIXME: We should rely on state to determin if VR is closed.

  return (
    <>
      <ViewingRoomMeta viewingRoom={viewingRoom} />

      <AppContainer maxWidth="100%">
        <ViewingRoomHeader viewingRoom={viewingRoom} />

        {viewingRoom.formattedEndAt === "Closed" ? (
          <ViewingRoomClosed viewingRoom={viewingRoom} />
        ) : (
          <>
            <ViewingRoomTabBar mb={[2, 3]} />
            {children}
          </>
        )}

        <Box mx={2}>
          <Separator mt={6} mb={3} />
          <Footer />
        </Box>
      </AppContainer>
    </>
  )
}

// Top-level route needs to be exported for bundle splitting in the router
export default createFragmentContainer(ViewingRoomApp, {
  viewingRoom: graphql`
    fragment ViewingRoomApp_viewingRoom on ViewingRoom {
      ...ViewingRoomMeta_viewingRoom
      ...ViewingRoomHeader_viewingRoom
      ...ViewingRoomClosed_viewingRoom
      formattedEndAt
    }
  `,
})
