#!/usr/bin/env node

process.setMaxListeners(35);

import * as p from '@clack/prompts';
import { setTimeout } from 'node:timers/promises';
import chalk from 'chalk';
import gradient from'gradient-string';

let totalCorrect = 0;

async function askQuestion (question, answers, correctAnswerIndex) {
    const options = []
    answers.forEach((answer) => {
        options.push({value: answer, label: answer})
    })

    const answer = await p.select({
        message: question,
        initialValue: '1',
        options: options,
    })

    const s = p.spinner();
    s.start();
    await setTimeout(1000);
    s.stop();

    if (answer == answers[correctAnswerIndex]) {
        totalCorrect++
    }
}

class Question {
    constructor(question, answersArray, correctAnswerIndex) {
        this.question = question;
        this.answersArray = answersArray;
        this.correctAnswerIndex = correctAnswerIndex;
    }
}


async function main() {
    p.intro(`${gradient.cristal('Ready to twist your brain into a pretzel? Buckle up, riddles are coming!')}`);

    const question1 = new Question(
        '1) I am a programming language with no spoken words. What am I?',
        [
            "JavaScript",
            "Python",
            "C++",
            "Java"
        ],
        0,
        "s",
        "a"
    );
    
    const question2 = new Question(
        '2) I have bugs, but I am not an insect. What am I?',
        [
            "Computer Program",
            "Picnic",
            "Garden",
            "Campfire"
        ],
        0,
    );
    
    const question3 = new Question(
        '13) I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?',
        [
            "Radio",
            "Windmill",
            "Echo",
            "Cloud"
        ],
        2,
    );
    
    const question4 = new Question(
        `4) I'm a loop that never ends. What am I?`,
        [
            "Infinity",
            "Circle",
            "Repetition",
            "Spiral"
        ],
        0,
    );
    
    const question5 = new Question(
        '5) I am a variable that never changes. What am I?',
        [
            "Constant",
            "Mutable",
            "Dynamic",
            "Static"
        ],
        3,
        "s",
        "a"
    );
    
    const question6 = new Question(
        `6) I'm always in classes but never attending. What am I?`,
        [
            "Teacher",
            "Student",
            "Homework",
            "Calendar"
        ],
        2,
    );
    
    const question7 = new Question(
        `7) I'm the result of 1 + 1, but I'm not 2. What am I?`,
        [
            "Window",
            "Sum",
            "Reflection",
            "Addition"
        ],
        2,
    );
    
    const question8 = new Question(
        `8) I have arrays of jokes, but I'm not a comedian. What am I?`,
        [
            "Stand-up Special",
            "Book",
            "Database",
            "Library"
        ],
        2,
    );
    
    const question9 = new Question(
        `9) I'm a function that never gets called. What am I?`,
        [
            "Unused Code",
            "Telephone",
            "Echo",
            "Alarm"
        ],
        0,
    );
    
    const question10 = new Question(
        `10) I'm a language with no grammar, yet I communicate with machines. What am I?`,
        [
            "HTML",
            "English",
            "Binary",
            "Emoji"
        ],
        2,
        "s",
        "a"
    );
    

    const allQuestions = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10]

    const readyToPlay = await p.select({
        message: 'Ready to play',
        initialValue: 'Yes',
        options: [
            {value: "Yes", label: "Yes"},
			{value: "No", label: "No"}
        ],
    })

    if (readyToPlay == 'Yes') {
        for ( const question of allQuestions) {
            await askQuestion(question.question, question.answersArray, question.correctAnswerIndex )
        }

        p.outro(`${gradient.vice(`You got ${totalCorrect} questions correct!`)}`);

        const secretMessages = [
            "You did it, you nerd!",
            "Congratulations, you're a genius!",
            "Amazing! You cracked the code!",
            "Impressive! You're a riddle master!"
          ];

          function getRandomMessage() {
            const randomIndex = Math.floor(Math.random() * secretMessages.length);
            return secretMessages[randomIndex];
          }
          

        if (totalCorrect == 10) {
            const s = p.spinner();
            s.start("Generating Secreat Message");
            await setTimeout(5000);
            s.stop();

            const randomMessage = getRandomMessage();
            p.outro(`${gradient.rainbow(randomMessage)}`);
        }else {
			const s = p.spinner();
			s.start();
			await setTimeout(3000);
			s.stop();
			p.outro(`${chalk.bgRed(chalk.black.bold(`You need 10/10 correct to unlock the secret message. Try again.`))}`);
		}
    } else {
        p.outro(`${chalk.bgMagenta(chalk.black.underline('bye Bye!!'))}`);
    }
}

main().catch(console.error);