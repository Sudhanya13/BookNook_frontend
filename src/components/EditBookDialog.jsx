{
  /* <Dialog
  open={!!editingBook}
  onOpenChange={(open) => {
    if (!open && !updating) {
      setEditingBook(null);
    }
  }}
>
  <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
    <DialogHeader>
      <DialogTitle>Edit Book</DialogTitle>
      <DialogDescription>Update your book information below.</DialogDescription>
    </DialogHeader>

    {editingBook && (
      <form onSubmit={handleUpdate} className="space-y-4">
        <div className="space-y-2">
          <Label>Book Title</Label>
          <Input
            value={editingBook.title || ""}
            onChange={(e) =>
              setEditingBook({
                ...editingBook,
                title: e.target.value,
              })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Author</Label>
          <Input
            value={editingBook.author || ""}
            onChange={(e) =>
              setEditingBook({
                ...editingBook,
                author: e.target.value,
              })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Category</Label>
          <Input
            value={editingBook.category || ""}
            onChange={(e) =>
              setEditingBook({
                ...editingBook,
                category: e.target.value,
              })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Cover Image URL</Label>
          <Input
            value={editingBook.cover || ""}
            onChange={(e) =>
              setEditingBook({
                ...editingBook,
                cover: e.target.value,
              })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            value={editingBook.description || ""}
            onChange={(e) =>
              setEditingBook({
                ...editingBook,
                description: e.target.value,
              })
            }
            rows={4}
            required
          />
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setEditingBook(null)}
            disabled={updating}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={updating}>
            {updating ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </form>
    )}
  </DialogContent>
</Dialog>; */
}
