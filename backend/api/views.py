from rest_framework.viewsets import ModelViewSet

from .models import Note
from .serializers import NoteSerializer


class NotesViewSet(ModelViewSet):
    queryset = Note.objects.all().order_by('-updated')
    serializer_class = NoteSerializer
