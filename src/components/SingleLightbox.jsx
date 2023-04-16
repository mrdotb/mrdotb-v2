import { useState } from "react"
import Image from "next/image";
import {
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
} from "yet-another-react-lightbox/core";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

function NextJsImage({ slide, rect }) {
  const { imageFit } = useLightboxProps().carousel;
  const cover = isImageSlide(slide.src) && isImageFitCover(slide.src, imageFit);

  const width = !cover
    ? Math.round(
        Math.min(rect.width, (rect.height / slide.src.height) * slide.src.width)
      )
    : rect.width;

  const height = !cover
    ? Math.round(
        Math.min(rect.height, (rect.width / slide.src.width) * slide.src.height)
      )
    : rect.height;

  return (
    <div style={{ position: "relative", width, height }}>
      <Image
        fill
        alt={slide.alt}
        src={slide.src}
        loading="eager"
        draggable={false}
        style={{ objectFit: cover ? "cover" : "contain" }}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
      />
    </div>
  );
}

function noop() {}

export function SingleLightbox(props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>
        <Image src={props.src} alt={props.alt} />
      </button>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slideshow={{ disabled: true }}
        slides={[props]}
        render={{ slide: NextJsImage, buttonPrev: noop, buttonNext: noop}}
      />
    </>
  )
}
