/**
 * Phrase Trie: word-level longest-contiguous-phrase matcher used by the route kernel.
 *
 * Routing keywords are multi-word phrases (e.g. "review code", "security review").
 * The trie stores each phrase word-by-word and, given a query, finds the longest
 * stored phrase that appears as a contiguous run of words in the query. Longest
 * phrase wins (most specific), with character length as a tiebreaker.
 */
export class PhraseTrie {
  constructor() {
    this.root = { children: {} };
  }

  /** Normalize a string into comparable lowercase word tokens. */
  static tokenize(text) {
    return String(text)
      .toLowerCase()
      .replace(/[?!.,;]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ')
      .filter(Boolean);
  }

  insert(phrase, routeId) {
    const words = PhraseTrie.tokenize(phrase);
    if (words.length === 0) return;
    let node = this.root;
    for (const word of words) {
      if (!node.children[word]) node.children[word] = { children: {} };
      node = node.children[word];
    }
    node.routeId = routeId;
    node.wordLength = words.length;
    node.charLength = phrase.length;
  }

  /**
   * Find the best matching route for a prompt.
   * @returns {{routeId:string, phrase:string, wordLength:number}|null}
   */
  search(prompt) {
    const words = PhraseTrie.tokenize(prompt);
    let best = null;
    for (let i = 0; i < words.length; i++) {
      let node = this.root;
      for (let j = i; j < words.length; j++) {
        node = node.children[words[j]];
        if (!node) break;
        if (node.routeId) {
          const candidate = {
            routeId: node.routeId,
            phrase: words.slice(i, j + 1).join(' '),
            wordLength: node.wordLength,
            charLength: node.charLength
          };
          if (
            !best ||
            candidate.wordLength > best.wordLength ||
            (candidate.wordLength === best.wordLength && candidate.charLength > best.charLength)
          ) {
            best = candidate;
          }
        }
      }
    }
    if (!best) return null;
    return { routeId: best.routeId, phrase: best.phrase, wordLength: best.wordLength };
  }
}

/** Build a PhraseTrie from a ROUTE_TABLE-style `{ keyword: routeId }` map. */
export function buildTrieFromRouteMap(routeMap) {
  const trie = new PhraseTrie();
  for (const [keyword, routeId] of Object.entries(routeMap || {})) {
    trie.insert(keyword, routeId);
  }
  return trie;
}
