import {
  animate,
  group,
  keyframes,
  state,
  style,
  transition,
  trigger,
  AnimationEvent,
} from '@angular/animations';
import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor],
  animations: [
    trigger('divState', [
      state(
        'normal',
        style({
          'background-color': 'red',
          transform: 'translateX(0)',
        })
      ),
      state(
        'highlighted',
        style({
          'background-color': 'blue',
          transform: 'translateX(100px)',
        })
      ),
      transition('normal <=> highlighted', animate(300)),
      // transition('highlighted => normal', animate(800)),
    ]),

    trigger('wildState', [
      state(
        'normal',
        style({
          'background-color': 'red',
          transform: 'translateX(0) scale(1)',
        })
      ),
      state(
        'highlighted',
        style({
          'background-color': 'blue',
          transform: 'translateX(100px) scale(1)',
        })
      ),
      state(
        'shrunk',
        style({
          'background-color': 'green',
          transform: 'translateX(0px) scale(0.5)',
        })
      ),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(800)),
      transition('shrunk <=> *', [
        style({
          'background-color': 'orange',
        }),
        animate(
          1000,
          style({
            'border-radius': '50px',
          })
        ),
        animate(500),
      ]),
    ]),

    trigger('list1', [
      state(
        'in', //dummy, not rly needed here
        style({
          opacity: '1',
          transform: 'translateX(0)',
        })
      ),
      transition('void => *', [
        style({
          opacity: '0',
          transform: 'translateX(-100px)',
        }),
        animate(300),
      ]), // non-existent => any
      transition('* => void', [
        animate(
          300,
          style({
            transform: 'translateX(100px)',
            opacity: '0',
          })
        ),
      ]),
    ]),

    trigger('list2', [
      state(
        'in', //dummy, not rly needed here
        style({
          opacity: '1',
          transform: 'translateX(0)',
        })
      ),
      transition('void => *', [
        animate(
          1000,
          keyframes([
            style({
              transform: 'translateX(-100px)',
              opacity: '0',
              offset: 0, //time
            }),
            style({
              transform: 'translateX(-50px)',
              opacity: '0.5',
              offset: 0.3,
            }),
            style({
              transform: 'translateX(-20px)',
              opacity: '1',
              offset: 0.8,
            }),
            style({
              transform: 'translateX(0px)',
              opacity: '1',
              offset: 1, // time done
            }),
          ])
        ),
      ]), // non-existent => any
      transition('* => void', [
        group([
          animate(
            300,
            style({
              color: 'red', // faster
            })
          ),
          animate(
            800,
            style({
              transform: 'translateX(100px)', // slower
              opacity: '0',
            })
          ),
        ]),
      ]),
    ]),
  ],
  styleUrl: './app.component.css',
  templateUrl: './app.component.html',
})
export class AppComponent {
  state = 'normal';
  wildState = 'normal';

  list = ['Milk', 'Sugar', 'Bread'];

  onAnimate() {
    this.state == 'normal'
      ? (this.state = 'highlighted')
      : (this.state = 'normal');
    this.wildState == 'normal'
      ? (this.wildState = 'highlighted')
      : (this.wildState = 'normal');
  }

  onShrink() {
    this.wildState = 'shrunk';
  }

  onAdd(item: string) {
    this.list.push(item);
  }

  onDelete(item: string) {
    this.list.splice(this.list.indexOf(item), 1);
  }

  animationStarted(event: AnimationEvent) {
    console.log(event);
  }
  animationEnded(event: AnimationEvent) {
    console.log(event);
  }
}
