import { DatePipe, SlicePipe } from "@angular/common";
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { Capacitor } from "@capacitor/core";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import {
  Animation,
  AnimationController,
  GestureController,
  IonItem,
  IonicModule,
} from "@ionic/angular";

const ANIMATION_BREAKPOINT = 70;

@Component({
  selector: "app-swipe-item",
  templateUrl: "./swipe-item.component.html",
  styleUrls: ["./swipe-item.component.scss"],
  standalone: true,
  imports: [IonicModule, DatePipe, SlicePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwipeItemComponent implements AfterViewInit {
  @Input("email") m: any;
  @ViewChild(IonItem, { read: ElementRef }) item!: ElementRef;
  @ViewChild("wrapper") wrapper!: ElementRef;
  @ViewChild("trash", { read: ElementRef }) trashIcon!: ElementRef;
  @ViewChild("archive", { read: ElementRef }) archiveIcon!: ElementRef;
  @Output() delete: EventEmitter<any> = new EventEmitter();

  bigIcon = false;

  trashAnimation!: Animation;
  archiveAnimation!: Animation;
  deleteAnimation!: Animation;

  constructor(
    private router: Router,
    private gestureCtrl: GestureController,
    private animationCtrl: AnimationController
  ) {}

  ngAfterViewInit() {
    this.setupIconAnimations();
    const style = this.item.nativeElement.style;
    const windowWidth = window.innerWidth;

    this.deleteAnimation = this.animationCtrl
      .create("delete-animation")
      .addElement(this.item.nativeElement)
      .duration(300)
      .easing("ease-out")
      .fromTo("height", "89px", "0");

    const moveGesture = this.gestureCtrl.create({
      el: this.item.nativeElement,
      gestureName: "move",
      threshold: 0,
      onStart: (ev) => {
        style.tansition = "";
      },
      onMove: (ev) => {
        style.transform = `translate3d(${ev.deltaX}px, 0, 0)`;
        this.item.nativeElement.classList.add("rounded");

        if (ev.deltaX > 0) {
          this.wrapper.nativeElement.style["background-color"] =
            "var(--ion-color-primary)";
        } else if (ev.deltaX < 0) {
          this.wrapper.nativeElement.style["background-color"] = "green";
        }

        if (ev.deltaX > ANIMATION_BREAKPOINT && !this.bigIcon) {
          this.animateTrash(true);
        } else if (
          ev.deltaX > 0 &&
          ev.deltaX < ANIMATION_BREAKPOINT &&
          this.bigIcon
        ) {
          this.animateTrash(false);
        }

        if (ev.deltaX < -ANIMATION_BREAKPOINT && !this.bigIcon) {
          this.animateArchive(true);
        } else if (
          ev.deltaX < 0 &&
          ev.deltaX > -ANIMATION_BREAKPOINT &&
          this.bigIcon
        ) {
          this.animateArchive(false);
        }
      },
      onEnd: (ev) => {
        this.item.nativeElement.classList.remove("rounded");
        style.transition = "0.2s ease-out";
        if (ev.deltaX > ANIMATION_BREAKPOINT) {
          style.transform = `translate3d(${windowWidth}px, 0, 0)`;
          this.deleteAnimation.play();
          this.deleteAnimation.onFinish(() => {
            this.delete.emit(true);
          });
        } else if (ev.deltaX < -ANIMATION_BREAKPOINT) {
          style.transform = `translate3d(-${windowWidth}px, 0, 0)`;
          this.deleteAnimation.play();
          this.deleteAnimation.onFinish(() => {
            this.delete.emit(true);
          });
        } else {
          style.transform = "";
        }
      },
    });
    moveGesture.enable();
  }

  setupIconAnimations() {
    this.trashAnimation = this.animationCtrl
      .create("trash-animation")
      .addElement(this.trashIcon.nativeElement)
      .duration(300)
      .easing("ease-in")
      .fromTo("transform", "scale(1)", "scale(1.5)");

    this.archiveAnimation = this.animationCtrl
      .create("archive-animation")
      .addElement(this.archiveIcon.nativeElement)
      .duration(300)
      .easing("ease-in")
      .fromTo("transform", "scale(1)", "scale(1.5)");
  }

  openDetails(id: number) {
    this.router.navigate(["mail", id]);
  }

  animateTrash(zoomIn: boolean) {
    this.bigIcon = zoomIn;
    if (zoomIn) {
      this.trashAnimation.direction("alternate").play();
    } else {
      this.trashAnimation.direction("reverse").play();
    }
    if (Capacitor.isNativePlatform()) {
      Haptics.impact({ style: ImpactStyle.Light });
    }
  }

  animateArchive(zoomIn: boolean) {
    this.bigIcon = zoomIn;
    if (zoomIn) {
      this.archiveAnimation.direction("alternate").play();
    } else {
      this.archiveAnimation.direction("reverse").play();
    }
    if (Capacitor.isNativePlatform()) {
      Haptics.impact({ style: ImpactStyle.Light });
    }
  }
}
