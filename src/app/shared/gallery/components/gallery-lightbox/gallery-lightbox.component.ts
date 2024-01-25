import { Component, OnInit, Renderer2 } from '@angular/core';
import { GalleryManagerService } from '../../services/gallery-manager.service';
import { ImageTextual } from '../../../../shared/models/image-textual.model';

@Component({
  selector: 'gallery-lightbox',
  templateUrl: './gallery-lightbox.component.html',
  styleUrl: './gallery-lightbox.component.scss'
})
export class GalleryLightboxComponent implements OnInit {
  private _activeImage!: ImageTextual | null;
  private _prevImage!: ImageTextual | null;
  private _nextImage!: ImageTextual | null;
  private _isActiveImageLoaded: boolean = false;
  private _lowerPrevNavImageWidth: number | null = null;
  private _lowerNextNavImageWidth: number | null = null;

  // Lifecycle

  constructor(
    private _galleryManagerService: GalleryManagerService
  ) { }

  ngOnInit() {
    this._galleryManagerService.activeImage$.subscribe((image) => {
      this._activeImage = image;
      this._isActiveImageLoaded = false;
    });

    this._galleryManagerService.nextImage$.subscribe((image) => {
      this._nextImage = image;
    });

    this._galleryManagerService.prevImage$.subscribe((image) => {
      this._prevImage = image;
    });
  }

  // Properties

  get activeImage(): ImageTextual | null {
    return this._activeImage;
  }

  get prevImage(): ImageTextual | null {
    return this._prevImage;
  }

  get nextImage(): ImageTextual | null {
    return this._nextImage;
  }

  get isActiveImageLoaded(): boolean {
    return this._isActiveImageLoaded;
  }

  get lowerPrevNavImageWidth(): number | null {
    return this._lowerPrevNavImageWidth;
  }

  set lowerPrevNavImageWidth(value: number | null) {
    this._lowerPrevNavImageWidth = value;
  }

  get lowerNextNavImageWidth(): number | null {
    return this._lowerNextNavImageWidth;
  }

  set lowerNextNavImageWidth(value: number | null) {
    this._lowerNextNavImageWidth = value;
  }

  // Methods

  onCloseClick() {
    this._galleryManagerService.closeLightbox();
  }

  onNextImageClick() {
    this._galleryManagerService.nextImage();
  }

  onPrevImageClick() {
    this._galleryManagerService.prevImage();
  }

  onActiveImageLoaded() {
    this._isActiveImageLoaded = true;
  }
}
