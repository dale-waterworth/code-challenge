package com.dale;

import com.google.common.base.Charsets;
import com.google.common.io.Resources;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class LogoLoco {

    public List<String> processFile(String filename) {
        var grid = wordsToGrid(filename);
        return Stream.concat(
                findHorizontal(grid).stream(),
                findVertical(grid).stream())
                .collect(Collectors.toList());
    }

    public TextMatrix wordsToGrid(String textFile) {
        return new TextMatrix(getFileAsLines(textFile));
    }

    public List<String> findHorizontal(TextMatrix textMatrix) {
        return Arrays.stream(textMatrix.getTextMatrix())
                .map(this::getWordsFromArray)
                .filter(arr -> arr.size() > 0)
                .map(arr -> arr.get(0))
                .flatMap(Stream::of)
                .collect(Collectors.toList());
    }

    public List<String> findVertical(TextMatrix textMatrix) {
        List<String> words = new ArrayList<>();
        for (int j = 0; j <= textMatrix.getX(); j++) {
            List<String> column = new ArrayList<>();
            for (int i = 0; i <= textMatrix.getY(); i++) {
                column.add(textMatrix.getChar(i, j));
            }
            words.addAll(getWordsFromArray(column));
        }
        return words;
    }

    private List<String> getWordsFromArray(List<String> column) {
        return getWordsFromArray(column.stream().toArray(String[]::new));
    }
    
    public List<String> getWordsFromArray(String[] letterArr) {
        return Arrays.stream(String.join("", letterArr).trim().split("\\s+"))
                .filter(word -> word.length() > 1)
                .collect(Collectors.toList());
    }

    public List<String> getFileAsLines(String fileName) {
        try {
            return Resources.readLines(Resources.getResource(fileName), Charsets.UTF_8);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ArrayList<>();
    }
}
