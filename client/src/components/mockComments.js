const mockComments = [
  {
    id: 1,
    username: "sunny_day_92",
    profilePic: "https://i.pravatar.cc/150?img=21",
    date: "2025-04-22T10:15:00Z",
    content:
      "This book absolutely *blew* my mind. The way the characters were developed over time felt incredibly real, and the pacing kept me hooked from start to finish. I couldn’t put it down.",
    likes: 42,
    dislikes: 3,
    replies: [
      {
        id: 11,
        username: "bookworm3000",
        profilePic: "https://i.pravatar.cc/150?img=2",
        date: "2025-04-21T08:30:00Z",
        content:
          "Totally agree. Especially Chapter 5—when everything changed—I had to go back and re-read it just to take it all in. One of the best plot twists I’ve read recently.",
        likes: 15,
        dislikes: 0,
      },
      {
        id: 12,
        username: "readallday",
        profilePic: "https://i.pravatar.cc/150?img=3",
        date: "2025-04-21T11:00:00Z",
        content:
          "I liked the overall plot, but I found it a bit slow in the middle. The buildup was strong, but I feel like the payoff could’ve come a little sooner.",
        likes: 7,
        dislikes: 2,
      },
    ],
  },
  {
    id: 2,
    username: "mysterylover",
    profilePic: "https://i.pravatar.cc/150?img=20",
    date: "2025-04-19T14:45:00Z",
    content:
      "I didn’t see the twist coming at all 😱 The author really did a fantastic job of laying down subtle clues without giving anything away. That ending will stay with me for a while.",
    likes: 34,
    dislikes: 1,
    replies: [
      {
        id: 21,
        username: "plotdetective",
        profilePic: "https://i.pravatar.cc/150?img=5",
        date: "2025-04-20T09:20:00Z",
        content:
          "Same here! I thought I had everything figured out, but the twist completely threw me. I love when a book keeps me guessing right up until the last chapter.",
        likes: 10,
        dislikes: 0,
      },
    ],
  },
  {
    id: 3,
    username: "quietreader",
    profilePic: "https://i.pravatar.cc/150?img=12",
    date: "2025-04-18T17:10:00Z",
    content:
      "Honestly, I felt the book was a bit overrated. There were definitely some strong points in terms of writing, but overall it didn’t resonate with me as much as it seems to have with others.",
    likes: 21,
    dislikes: 5,
    replies: [],
  },
  {
    id: 4,
    username: "classicfan",
    profilePic: "https://i.pravatar.cc/150?img=17",
    date: "2025-04-17T13:25:00Z",
    content:
      "This book reminded me a lot of the classic novels I used to read growing up. There’s something timeless about the way the narrative unfolds—quietly powerful and deeply emotional.",
    likes: 55,
    dislikes: 4,
    replies: [
      {
        id: 41,
        username: "newschoolreader",
        profilePic: "https://i.pravatar.cc/150?img=8",
        date: "2025-04-18T10:00:00Z",
        content:
          "Interesting take. I actually felt like it leaned more into modern storytelling, especially with the way it handled character perspectives and pacing.",
        likes: 8,
        dislikes: 1,
      },
      {
        id: 42,
        username: "litrpgfan",
        profilePic: "https://i.pravatar.cc/150?img=8",
        date: "2025-04-18T10:30:00Z",
        content:
          "I think it was a pretty solid blend of both modern and classic styles. That’s what made it so refreshing to read—something familiar, but still new.",
        likes: 11,
        dislikes: 0,
      },
      {
        id: 43,
        username: "paperbackpirate",
        profilePic: "https://i.pravatar.cc/150?img=11",
        date: "2025-04-18T11:15:00Z",
        content:
          "The writing style reminded me of Dickens in some places, especially in the descriptions. It’s rare to find a book today that goes so deep into the emotional tone of the setting.",
        likes: 13,
        dislikes: 2,
      },
    ],
  },
];

export default mockComments;
