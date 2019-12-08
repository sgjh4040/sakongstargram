import "./env";
import {authenticateJwt} from "./passport"
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema"
import "./passport";
import {isAuthenticated} from "./middlewares";
import {uploadCOntroller, uploadMiddleWare} from "./upload"

const PORT = process.env.PORT || 4000;


const server = new GraphQLServer({
  schema,
  context: ({request}) =>({request,isAuthenticated})
});

server.express.use(logger("dev"));
server.express.use(authenticateJwt);
server.express.post("/api/upload",uploadMiddleWare,uploadCOntroller);

server.start({ port: PORT }, () =>
  console.log(`Server running on  http://localhost:${PORT}`)
);