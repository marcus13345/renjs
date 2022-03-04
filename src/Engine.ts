import ansi from 'sisteransi';
import prompts from 'prompts';

export class Engine {

  constructor() {
    process.on('beforeExit', () => {
      this.prepScreenTop();
    })
  }

  async prompt(question: string, choices: { [key: number]: string } | { [key: string]: string }) {
    const _choices = [];
    for(const key in choices) {
      // * idk how to TS this properly man
      _choices.push({ title: (choices as any)[key] as string, value: key})
    }
    const value = (await prompts({
      type: 'select',
      name: 'value',
      message: question,
      choices: _choices,
      initial: 1,
      hint: '   '
    })).value;
    process.stdout.write(ansi.cursor.hide);
    return value;
  }

  prepScreen() {
    console.clear();
    process.stdout.write(
      ansi.cursor.down(process.stdout.rows * 2) +
      ansi.cursor.hide
    );
  }

  play(fn: Function) {
    setTimeout(() => {
      fn();
    }, 0);
  }

  emptyLine() {
    console.log();
  }

  prepScreenTop() {
    console.clear();
    process.stdout.write(
      ansi.cursor.down(process.stdout.rows * 2) +
      ansi.cursor.hide +
      ansi.cursor.up(Math.floor(process.stdout.rows))
    );
  }

  async sceneChange(place: string, time?: string) {
    console.log('');
    console.log(padCenterWithMargin(place));
    console.log('');
  }

  async timePass(s = 9) {
    let bar = [' ', ' '];
    for(let i = 0; i < s; i ++) {
      const str = bar.join('*');
      process.stdout.write('\n' + padCenter(str) + '\n' + ansi.cursor.up(2));
      await new Promise(res => setTimeout(res, 300));
      bar.push(' ');
    }
    process.stdout.write(ansi.cursor.down(2));
  }
}

function padCenter(str: string, chr = ' ', w = process.stdout.columns) {
  const left = Math.floor((w - str.length) / 2);
  const right = w - str.length - left;
  return chr.repeat(left) + str + chr.repeat(right);
}

function padCenterWithMargin(str: string) {
  return padCenter(padCenter(`\u2528 ${str} \u2520`, '\u2500', Math.max(process.stdout.columns - 8, 0)))
}