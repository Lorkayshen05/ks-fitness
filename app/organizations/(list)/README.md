`(list)` is a route group, so it adds nothing to the URL: the page inside it
still serves `/organizations`.

It exists to scope `loading.tsx`. A `loading.tsx` placed directly in
`app/organizations/` would also wrap `organizations/[slug]`, and streaming the
skeleton commits a 200 status before the detail page can call `notFound()` —
turning a genuine 404 into a soft 404. Keeping the skeleton inside the group
gives the index route its loading state while leaving the detail route free to
return a real 404. The same applies to `app/stories/(list)`.
