import React from "react";
import { render } from "@testing-library/react";
import Hero from "../src/components/Hero";
import "@testing-library/jest-dom/extend-expect";

const testImg =
  "https://www.morristourism.org/wp-content/uploads/2017/09/this-is-a-test-image.png";
const cssStyle =
  "linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.6))";
const testText =
  "orem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim lectus consequat turpis interdum condimentum. In hac habitasse platea dictumst. Quisque fermentum nibh id enim auctor, sit amet dictum purus lobortis.";

test("renders hero component", async () => {
  const { container } = render(<Hero image_url={testImg}>{testText}</Hero>);
  const heroImage = container.querySelector(".hero-image");

  expect(heroImage).toBeInTheDocument();
  expect(heroImage).toHaveStyle(
    `background-image: ${cssStyle},url(${testImg})`
  );
});
