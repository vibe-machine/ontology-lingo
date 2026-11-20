# Questions the Lingo ontology must answer

These are Lingo's own competency questions for the part of its model that records what was read,
what each source says, and what we intend to model. They come from what Studio does today and from what
the first reading of a book for the product operating model needed. The schema (`schema/lingo.tql`) was written to answer them. Questions marked "run" have a query in `queries/`,
answered against a scratch database holding gist, this package and the sample in `fixtures/`.

## What was read

1. Which sources have been read for a subject, by whom, when, and under which version of the reading brief?
2. Which passages of a source does any claim rest on, and which sources yielded nothing?
3. Which claims has a second reader checked, and what did each check find?

## What each source says

4. What does one source say about one term: every claim that is about it?
5. Which claims did the source state outright, and which did the reader infer?
6. Which claims came from a story the source tells and not from a statement it makes?
7. Which distinctions does a source draw between two terms, and what separates them? (run)
8. Into what kinds, parts, options or stages does a source divide a term, and does it call the list complete? (run)
9. Which states does a source say a thing passes through, and are they ordered?
10. Who does a source say does, decides or approves what?
11. Which rules does a source place on a term, how strong is each, and what number does it give?
12. Which terms were named by the reader because the source relied on them without naming them?

## Across sources

13. Which terms do two sources use with different meanings?
14. Which source terms have not been reconciled with our concepts yet? (run)
15. Which source terms have we decided are one of our concepts, how close is the fit, who decided, and why?
16. How many new terms did the latest source add that no earlier source had?

## What we intend to model

17. What is in force in the brief for a subject: its purpose, scope, concepts, relations, constraints and questions?
18. What changed between two revisions of the brief, and which statement replaced which?
19. Which statements did the owner assert, which did the assistant suggest, and which are assumed?
20. Which concepts in the brief rest on no claim from any source? (run)
21. Which concepts rest on a single source?
22. Which concepts in the brief does no competency question refer to? (run)
23. Which competency questions refer to nothing in the brief?

## The process (added after the owner's ruling that the book is the source)

24. In which working session was a reading done, and where is its transcript kept? (run)
25. Which statements in the brief rest only on what the owner said in a session, and on no published source? (run)

## Format and location (added after the owner's ruling that a source has both)

26. In what file format is each source, and where is each copy of it kept? (run)
27. From which copy was a reading made, so that its line or page numbers can be found again? (run)

## Left for later parts

Amendments and their reviews, the grounding plan, the change set, verification and apply are not in this
version. Their ideas stand; they would be re-seated on gist the same way.
