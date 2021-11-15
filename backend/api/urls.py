from django.urls import path
from .views import *

urlpatterns = [
    path('notes/', GetNotes.as_view(), name='notes'),
    path('notes/<str:pk>/', GetNote.as_view(), name='note'),
]
