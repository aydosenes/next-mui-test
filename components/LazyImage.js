import NextImage from "next/image";
import styled from "@mui/material/styles/styled";
const LazyImage = styled(NextImage)({
  maxWidth: "100%",
  maxHeight: "100%",
  width: "auto",
  height: "auto",
});
export default LazyImage;