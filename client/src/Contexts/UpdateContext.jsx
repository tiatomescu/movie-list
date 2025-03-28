import { createContext} from "react";

const UpdateContext = createContext({update: 1, setUpdate: () => {}});

export default UpdateContext;