# Auction SHOW page

### Bidder Creation Flow

```
          +------------*-*-*-*---------------+<------------------------------------------------+
          |          User Visits             |                                                 |
+---------> /auction/:slug/registration-flow |              +----[Client]-----+                |
|         +----------------------------------+----+-------> |REGISTRATION FLOW|                |
|                                                 |         +-------+---------+            Redirect
|                                                 |                 |                          |
|                                                 |                 |                          |
|                                                 |                 |                          |
|         +----------*-*-*-*---------+            |            +----v-----+  No          +-----+----+
|         |User visits /auction/:slug|            |            |Logged In?+-------------->Auth Modal|
|         +-----------+--------------+            |            +----+-----+              +----------+
|                     |                           |                 |
|                     |                           |                 |
|               +-----+----------------+          |                 |Yes
|               |User Clicks 'Register'+----------+                 |
|               +----------------------+                            |                             +-*-*-*-*--+
|                                                           +-------v----------+                  |Entrypoint|
|                                                           |User has qualified|                  +----------+
|        +----------*-*-*-*----------+                 No   | credit cards?    |
|        |     User Visits           +<---------------------+-------+----------+
|        |/auction-registration/:slug|     Redirect                 |
|        +-------------+-------------+                              |
|                      |             ^                              |Yes
|                      |             |                              |
|                      |             |                              |
|                      v             |                     +--------v-------------+   Close
|            +------[Server]------+  |                     |Show Accept Conditions|   Modal   +--------------------+
|            |BIDDER CREATION FLOW<-------------------+    |of Sale Modal         +---------->+URL is auction/:slug|
|            +-+------------------+  |                |    +--------+-------------+           +--------------------+
|              |                     |                |             |
|              |    +---No----^------+----+           |             |
|              v    |         |Redirect to|           |             |
|          +---+----+-+       |Login      |           |    +--------v--------------+
|          |Logged In?|       +-----------+           |    |User Accepts Conditions|
|          +---+------+                               |    +--------+--------------+
|              |                                      |             |
|              +-Sale is registerable                 |             |
|              | (else render registration-error)     |    +--------v------------------------------------------------+
|              |                                      +----+    Navigates to                                         |
|              |                                           |    /auction-registration/:slug?accepted-conditions=true |
|              +-User is not registered                    +---------------------------------------------------------+
|              | (else redirect to
|              |  /auction/:slug/confirm-registration)
|              |
|              +-Sale is found (else 404)
|              |
|              |                          +---------------------+
|      +-------v----------+    No         |Render 'registration'+----------------+
|      |User has qualified+--------------->Credit Card Form     |                |
|      | credit cards?    |               +---------------------+                |
|      +-------+----------+                                            +---------v-------------------------+
|              |                +---------------------------+          |CREATE BIDDER                      |
|              +-----Yes------->+ User came through modal?  +---Yes---->& Redirect to                      |
|                               |(?accepted-conditions=true)|          |/auction/:slug/confirm-registration|
|                               +-----------+---------------+          +-----------------------------------+
|                                           |
|                                          No
|                                           |
+---------------------------<-<-Redirect----+
```
