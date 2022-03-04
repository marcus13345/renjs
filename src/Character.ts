import chalk from 'chalk';
import ansi from 'sisteransi';

// fun.
type AnsiColor = 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100 | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110 | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119 | 120 | 121 | 122 | 123 | 124 | 125 | 126 | 127 | 128 | 129 | 130 | 131 | 132 | 133 | 134 | 135 | 136 | 137 | 138 | 139 | 140 | 141 | 142 | 143 | 144 | 145 | 146 | 147 | 148 | 149 | 150 | 151 | 152 | 153 | 154 | 155 | 156 | 157 | 158 | 159 | 160 | 161 | 162 | 163 | 164 | 165 | 166 | 167 | 168 | 169 | 170 | 171 | 172 | 173 | 174 | 175 | 176 | 177 | 178 | 179 | 180 | 181 | 182 | 183 | 184 | 185 | 186 | 187 | 188 | 189 | 190 | 191 | 192 | 193 | 194 | 195 | 196 | 197 | 198 | 199 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 209 | 210 | 211 | 212 | 213 | 214 | 215 | 216 | 217 | 218 | 219 | 220 | 221 | 222 | 223 | 224 | 225 | 226 | 227 | 228 | 229 | 230 | 231 | 232 | 233 | 234 | 235 | 236 | 237 | 238 | 239 | 240 | 241 | 242 | 243 | 244 | 245 | 246 | 247 | 248 | 249 | 250 | 251 | 252 | 253 | 254 | 255;

interface CharacterConstructorProps {
  color?: AnsiColor;
  name: string
}

const sleep = (n: number) => new Promise(res => setTimeout(res, n));

async function glitchText(string: string) {
  const rchar = () => "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM".charAt(Math.floor(Math.random() * 52));
  const rcolor = () => chalk.ansi256(Math.floor(Math.random() * 240) + 16);
  for(const char of string) {
    const r = 5 + Math.random() * 5;
    for(let i = 0; i < r; i ++) {
      process.stdout.write(rcolor()(rchar()));
      process.stdout.write(ansi.cursor.backward(1));
      await sleep(5);
    }
    process.stdout.write(char);
    await sleep(10);
  }
}

async function slowText(string: string) {
  for(const char of string) {
    process.stdout.write(char);
    await sleep(50);
  }
}

export class Character {

  color: AnsiColor;
  name: string;

  constructor(options: CharacterConstructorProps) {
    this.color = options.color ?? 54;
    this.name = options.name;
  }

  async say(str: string) {
    process.stdout.write(chalk.ansi256(this.color)(this.name) + ': ');
    await slowText(str);
    console.log();
  }

  async think(str: string) {
    process.stdout.write(chalk.ansi256(this.color)(this.name) + ': ');
    await slowText(chalk.italic(str));
    console.log();
  }
}

const claire = new Character({
  name: "Claire",
  color: 173
});

console.clear();
process.stdout.write(ansi.cursor.down(process.stdout.rows * 2) + ansi.cursor.hide);

(async () => {
  await claire.say("Nice weather we're having!");
  await claire.think("Nice weather we're having!");
})();