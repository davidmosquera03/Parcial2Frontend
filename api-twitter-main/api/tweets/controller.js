const Tweet = require("./model");
const { locale } = require("../../locale");
const { getTweetsByUsername } = require("../services/twitterService");

const list = (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  Tweet.find({}, ["content", "comments", "likes", "user", "createdAt", "replyTo"])
    .populate("user", ["name", "username"])
    .populate("comments.user", ["name", "username"])
    // Popula el tweet original al que se respondió
    .populate("replyTo", ["content", "user", "createdAt"])
    .limit(Number(limit))
    .skip(skip)
    .sort({ createdAt: -1 })
    .then(async (tweets) => {
      const total = await Tweet.estimatedDocumentCount();
      const totalPages = Math.round(total / limit);
      const hasMore = page < totalPages;

      res.status(200).json({
        hasMore,
        totalPages,
        total,
        data: tweets,
        currentPage: page,
      });
    });
};


const create = (req, res) => {
  const { content, userId, replyTo } = req.body;

  // Se arma el objeto tweet y, de existir, se agrega replyTo
  const tweet = {
    content,
    user: userId,
  };

  if (replyTo) {
    tweet.replyTo = replyTo;
  }

  const newTweet = new Tweet(tweet);
  newTweet.save().then((tweetCreated) => {
    res.status(200).json(tweetCreated);
  });
};


const createComment = (req, res) => {
  const { comment, tweetId, userId } = req.body;

  const comments = {
    comment,
    user: userId,
  };

  Tweet.updateOne({ _id: tweetId }, { $addToSet: { comments } })
    .then(() => {
      res.status(200).json({ message: "ok" });
    })
    .catch((error) => {
      res.status(500).json({ message: "not updated" });
    });
};

const likes = async (req, res) => {
  try {
    const { tweetId, userId } = req.body;
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }

    // Convertimos los ObjectId a string para comparar fácilmente
    const likesAsString = tweet.likes.map((id) => id.toString());
    const userHasLiked = likesAsString.includes(userId);

    if (userHasLiked) {
      // El usuario ya dio like: se elimina su like
      await Tweet.updateOne({ _id: tweetId }, { $pull: { likes: userId } });
      return res.status(200).json({ message: "Like removed" });
    } else {
      // El usuario no ha dado like: se agrega su like
      await Tweet.updateOne({ _id: tweetId }, { $addToSet: { likes: userId } });
      return res.status(200).json({ message: "Like added" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const destroyTweet = async (req, res) => {
  const { tweetId, userId } = req.body;

  await Tweet.findOneAndDelete(
    {
      $and: [{ _id: { $eq: tweetId } }, { user: { $eq: userId } }],
    },
    (err, docs) => {
      if (err) {
        res.status(500).json({
          message: `${locale.translate("errors.tweet.onDelete")}`,
        });
      } else if (docs) {
        res.status(200).json({
          message: `${locale.translate("success.tweet.onDelete")}`,
          id: docs._id,
        });
      } else {
        res.status(404).json({
          message: `${locale.translate("errors.tweet.tweetNotExists")}`,
        });
      }
    }
  );
};

const getExternalTweetsByUsername = async (req, res) => {
  const { username } = req.params;
  const tweetsResponse = await getTweetsByUsername(username);
  const tweets = tweetsResponse.map(({ text, created_at }) => {
    return {
      text,
      created_at,
    };
  });
  res.status(200).json(tweets);
};

module.exports = {
  list,
  create,
  createComment,
  likes,
  destroyTweet,
  getExternalTweetsByUsername,
};