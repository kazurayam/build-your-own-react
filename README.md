# build-your-own-react

[【図解解説】仮想DOM完全理解！君だけのオリジナルReactで仕組みを学ぶチュートリアル](https://qiita.com/Sicut_study/items/710ea707d4426011710f)
を写経する


## ユニットテストを追加する


『仮想DOM完全理解！』の記事はユニットテストについてなにも書いていないが、著者がユニットテストをしなかったはずはないから、きっと記事を簡略化するために省略したのだろう。わたしが写経する途中、どうしてもユニットテストを書いて動作を確認したくなった。さもないと記事が紹介するMyReactのコードをちゃんと理解できないと感じた。そこでユニットテストを追加した。下記の記事を参考にした。

[（自分の）JavaScriptのユニットテストの書き方,Zenn,mizchi](https://zenn.dev/mizchi/articles/my-test-policy)

### vitestをインストールする

```
$ cd make-react
$ npm install -D vitest c8
```

### テストを書く

see src/add.test.ts

### テストを実行する

```
$ npx vitest src/add.test.ts
```

## vitestのなかでDOMを操作するコードをテストするにはDOMのAPIをmockしなければならない。そのためにはJSDOMを使う。

To install JSDOM for Vitest in a Vite project, run the command npm install --save-dev jsdom vitest. Then, configure your Vitest setup by adding environment: 'jsdom' in your vite.config.ts file.